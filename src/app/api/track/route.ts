import { NextResponse } from "next/server";

// In-memory rate limiting and deduplication for visitor activity tracking
const activityCache = new Map<string, number>();

function isDuplicateActivity(key: string, cooldownMs: number): boolean {
  const now = Date.now();
  const lastTime = activityCache.get(key) || 0;
  if (now - lastTime < cooldownMs) {
    return true;
  }
  activityCache.set(key, now);
  
  // Cleanup old keys periodically
  if (activityCache.size > 1000) {
    for (const [k, time] of activityCache.entries()) {
      if (now - time > 60000) {
        activityCache.delete(k);
      }
    }
  }
  return false;
}

async function sendTelegramActivity(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const clean = (val?: string) => (val || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();

function escapeHtml(val?: string): string {
  if (!val) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const {
      event,
      sessionId = "anon",
      page = "/",
      section,
      ctaLabel,
      intent = "LOW",
      deviceType = "Mobile",
      utmSource = "direct",
      referrer = "direct",
      timestamp = new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
    } = body;

    const safePage = escapeHtml(clean(page));
    const safeSection = escapeHtml(clean(section));
    const safeCtaLabel = escapeHtml(clean(ctaLabel));
    const safeIntent = escapeHtml(clean(intent));
    const safeDeviceType = escapeHtml(clean(deviceType));
    const safeUtmSource = escapeHtml(clean(utmSource));
    const safeReferrer = escapeHtml(clean(referrer));
    const rawSessionId = clean(sessionId);
    const safeSessionId = escapeHtml(rawSessionId);

    // Rate limiting key: event + rawSessionId + (section || page || ctaLabel)
    const dedupKey = `${rawSessionId}:${clean(event)}:${clean(section) || clean(page) || clean(ctaLabel)}`;
    
    // Cooldown: 15s for page/section view, 5s for CTA
    const cooldown = event === "page_view" || event === "section_view" ? 15000 : 5000;
    if (isDuplicateActivity(dedupKey, cooldown)) {
      return NextResponse.json({ ok: true, deduplicated: true });
    }

    let telegramText = "";

    switch (event) {
      case "visitor_session_started":
        telegramText =
          `👤 <b>VIZITATOR NOU</b>\n\n` +
          `🌐 <b>Site:</b> credite.cristianvaduva.com\n` +
          `📄 <b>Pagina:</b> ${safePage}\n` +
          `📱 <b>Device:</b> ${safeDeviceType}\n` +
          `🌍 <b>Referrer:</b> ${safeReferrer}\n` +
          `🔗 <b>UTM:</b> ${safeUtmSource}\n` +
          `🕐 <b>Ora:</b> ${escapeHtml(timestamp)}\n` +
          `🆔 <b>Session:</b> <code>#${safeSessionId.slice(0, 8)}</code>`;
        break;

      case "page_view":
        telegramText =
          `👀 <b>PAGINĂ ACCESATĂ</b>\n\n` +
          `📄 <b>Pagina:</b> ${safePage}\n` +
          `📱 <b>Device:</b> ${safeDeviceType}\n` +
          `🆔 <b>Session:</b> <code>#${safeSessionId.slice(0, 8)}</code>`;
        break;

      case "section_view":
        telegramText =
          `👀 <b>SECȚIUNE VIZUALIZATĂ</b>\n\n` +
          `🏷️ <b>Secțiune:</b> ${safeSection || "—"}\n` +
          `📍 <b>Path:</b> ${safePage}\n` +
          `📱 <b>Device:</b> ${safeDeviceType}\n` +
          `🆔 <b>Session:</b> <code>#${safeSessionId.slice(0, 8)}</code>`;
        break;

      case "cta_click":
        telegramText =
          `🎯 <b>INTERACȚIUNE CTA</b>\n\n` +
          `<b>Action:</b> ${safeCtaLabel || "CTA"}\n` +
          `📍 <b>Pagină:</b> ${safePage}\n` +
          `📱 <b>Device:</b> ${safeDeviceType}\n` +
          `🆔 <b>Session:</b> <code>#${safeSessionId.slice(0, 8)}</code>`;
        break;

      case "cta_whatsapp_clicked":
        telegramText =
          `💬 <b>WHATSAPP</b>\n\n` +
          `Vizitatorul a apăsat „Discută pe WhatsApp”\n` +
          `📍 <b>Pagină:</b> ${safePage}\n` +
          `📱 <b>Device:</b> ${safeDeviceType}\n` +
          `🆔 <b>Session:</b> <code>#${safeSessionId.slice(0, 8)}</code>`;
        break;

      case "lead_form_started":
        telegramText =
          `📝 <b>FORMULAR ÎNCEPUT</b>\n\n` +
          `📍 <b>Pagină:</b> ${safePage}\n` +
          `📱 <b>Device:</b> ${safeDeviceType}\n` +
          `🎯 Formular analiză financiară\n` +
          `🔥 <b>Intent:</b> ${safeIntent}\n` +
          `🆔 <b>Session:</b> <code>#${safeSessionId.slice(0, 8)}</code>`;
        break;

      case "lead_form_step_3":
        telegramText =
          `🔥 <b>LEAD — A AJUNS LA CONTACT</b>\n\n` +
          `📍 Formular analiză financiară\n` +
          `👤 <b>Stadiu:</b> A ajuns la Nume / Telefon / Email\n` +
          `📱 <b>Device:</b> ${safeDeviceType}\n` +
          `🔥 <b>Intent:</b> VERY HIGH\n` +
          `🆔 <b>Session:</b> <code>#${safeSessionId.slice(0, 8)}</code>`;
        break;

      case "referral_page_viewed":
        telegramText =
          `🤝 <b>RECOMANDARE</b>\n\n` +
          `Vizitatorul a accesat pagina de recomandări\n` +
          `📍 <b>Pagină:</b> /referral\n` +
          `📱 <b>Device:</b> ${safeDeviceType}\n` +
          `🆔 <b>Session:</b> <code>#${safeSessionId.slice(0, 8)}</code>`;
        break;

      default:
        telegramText =
          `⚡ <b>ACTIVITATE VIZITATOR</b>\n\n` +
          `<b>Event:</b> ${escapeHtml(clean(event))}\n` +
          `📍 <b>Pagină:</b> ${safePage}\n` +
          `📱 <b>Device:</b> ${safeDeviceType}\n` +
          `🆔 <b>Session:</b> <code>#${safeSessionId.slice(0, 8)}</code>`;
        break;
    }

    // Fire and forget telegram notification
    sendTelegramActivity(telegramText).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
