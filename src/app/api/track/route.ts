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

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    // Rate limiting key: event + sessionId + (section || page || ctaLabel)
    const dedupKey = `${sessionId}:${event}:${section || page || ctaLabel}`;
    
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
          `📄 <b>Pagina:</b> ${page}\n` +
          `📱 <b>Device:</b> ${deviceType}\n` +
          `🌍 <b>Referrer:</b> ${referrer}\n` +
          `🔗 <b>UTM:</b> ${utmSource}\n` +
          `🕐 <b>Ora:</b> ${timestamp}\n` +
          `🆔 <b>Session:</b> <code>#${sessionId.slice(0, 8)}</code>`;
        break;

      case "page_view":
        telegramText =
          `👀 <b>PAGINĂ ACCESATĂ</b>\n\n` +
          `📄 <b>Pagina:</b> ${page}\n` +
          `📱 <b>Device:</b> ${deviceType}\n` +
          `🆔 <b>Session:</b> <code>#${sessionId.slice(0, 8)}</code>`;
        break;

      case "section_view":
        telegramText =
          `👀 <b>SECȚIUNE VIZUALIZATĂ</b>\n\n` +
          `🏷️ <b>Secțiune:</b> ${section || "—"}\n` +
          `📍 <b>Path:</b> ${page}\n` +
          `📱 <b>Device:</b> ${deviceType}\n` +
          `🆔 <b>Session:</b> <code>#${sessionId.slice(0, 8)}</code>`;
        break;

      case "cta_click":
        telegramText =
          `🎯 <b>INTERACȚIUNE CTA</b>\n\n` +
          `<b>Action:</b> ${ctaLabel || "CTA"}\n` +
          `📍 <b>Pagină:</b> ${page}\n` +
          `📱 <b>Device:</b> ${deviceType}\n` +
          `🆔 <b>Session:</b> <code>#${sessionId.slice(0, 8)}</code>`;
        break;

      case "cta_whatsapp_clicked":
        telegramText =
          `💬 <b>WHATSAPP</b>\n\n` +
          `Vizitatorul a apăsat „Discută pe WhatsApp”\n` +
          `📍 <b>Pagină:</b> ${page}\n` +
          `📱 <b>Device:</b> ${deviceType}\n` +
          `🆔 <b>Session:</b> <code>#${sessionId.slice(0, 8)}</code>`;
        break;

      case "lead_form_started":
        telegramText =
          `📝 <b>FORMULAR ÎNCEPUT</b>\n\n` +
          `📍 <b>Pagină:</b> ${page}\n` +
          `📱 <b>Device:</b> ${deviceType}\n` +
          `🎯 Formular analiză financiară\n` +
          `🔥 <b>Intent:</b> ${intent}\n` +
          `🆔 <b>Session:</b> <code>#${sessionId.slice(0, 8)}</code>`;
        break;

      case "lead_form_step_3":
        telegramText =
          `🔥 <b>LEAD — A AJUNS LA CONTACT</b>\n\n` +
          `📍 Formular analiză financiară\n` +
          `👤 <b>Stadiu:</b> A ajuns la Nume / Telefon / Email\n` +
          `📱 <b>Device:</b> ${deviceType}\n` +
          `🔥 <b>Intent:</b> VERY HIGH\n` +
          `🆔 <b>Session:</b> <code>#${sessionId.slice(0, 8)}</code>`;
        break;

      case "referral_page_viewed":
        telegramText =
          `🤝 <b>RECOMANDARE</b>\n\n` +
          `Vizitatorul a accesat pagina de recomandări\n` +
          `📍 <b>Pagină:</b> /referral\n` +
          `📱 <b>Device:</b> ${deviceType}\n` +
          `🆔 <b>Session:</b> <code>#${sessionId.slice(0, 8)}</code>`;
        break;

      default:
        telegramText =
          `⚡ <b>ACTIVITATE VIZITATOR</b>\n\n` +
          `<b>Event:</b> ${event}\n` +
          `📍 <b>Pagină:</b> ${page}\n` +
          `📱 <b>Device:</b> ${deviceType}\n` +
          `🆔 <b>Session:</b> <code>#${sessionId.slice(0, 8)}</code>`;
        break;
    }

    // Fire and forget telegram notification
    sendTelegramActivity(telegramText).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
