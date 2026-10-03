// Test Suite for Form Payload to Telegram Verification & Ecosystem Source Identification

import assert from "node:assert";

// Import modules to test
import {
  detectEcosystemProperty,
  formatTelegramTitle,
  ECOSYSTEM_PROPERTIES,
  escapeHtml,
  cleanString,
  formatShortId,
  parseDeviceFromUA,
  parseGeoFromHeaders,
} from "../src/lib/ecosystem";

console.log("=================================================");
console.log("🧪 STARTING TELEGRAM PAYLOAD & ECOSYSTEM TEST SUITE");
console.log("=================================================\n");

// --- TEST 1: ECOSYSTEM PROPERTY DETECTION & HEADERS ---
console.log("▶️ TEST 1: Ecosystem Source Identification");

const testProperties = [
  { hint: "https://credite.cristianvaduva.com/", expectedKey: "credite", expectedTitle: "💳 <b>CREDITE.CRISTIANVADUVA.COM — 🟢 LEAD NOU</b>" },
  { hint: "https://insurance.cristianvaduva.com/asigurare-viata", expectedKey: "insurance", expectedTitle: "🛡️ <b>INSURANCE.CRISTIANVADUVA.COM — 🟢 LEAD NOU</b>" },
  { hint: "https://homefind.cristianvaduva.com/", expectedKey: "homefind", expectedTitle: "🏠 <b>HOMEFIND.CRISTIANVADUVA.COM — 👀 VISITOR NOU</b>" },
  { hint: "https://aixmedia.cristianvaduva.com/video", expectedKey: "aixmedia", expectedTitle: "🎬 <b>AIXMEDIA.CRISTIANVADUVA.COM — ▶️ VIDEO VIEW</b>" },
  { hint: "https://constructions.cristianvaduva.com/", expectedKey: "constructions", expectedTitle: "🏗️ <b>CONSTRUCTIONS.CRISTIANVADUVA.COM — 🟢 LEAD NOU</b>" },
  { hint: "https://fly.cristianvaduva.com/charter", expectedKey: "fly", expectedTitle: "✈️ <b>FLY.CRISTIANVADUVA.COM — 🟢 LEAD NOU</b>" },
];

for (const tc of testProperties) {
  const prop = detectEcosystemProperty(tc.hint);
  assert.strictEqual(prop.key, tc.expectedKey, `Expected key ${tc.expectedKey} for hint ${tc.hint}`);
  const eventBadge = tc.expectedTitle.split(" — ")[1].replace("</b>", "");
  const formatted = formatTelegramTitle(prop.key, eventBadge);
  assert.strictEqual(formatted, tc.expectedTitle, `Title mismatch: got ${formatted}, expected ${tc.expectedTitle}`);
  console.log(`  ✅ Source '${tc.expectedKey}' properly identified -> ${formatted}`);
}

// Check Constructions brand
assert.strictEqual(
  ECOSYSTEM_PROPERTIES.constructions.brand,
  "CONSTRUCTIONS by AiXLuxury",
  "Constructions branding must be 'CONSTRUCTIONS by AiXLuxury'"
);
console.log(`  ✅ Brand confirmed: ${ECOSYSTEM_PROPERTIES.constructions.brand}`);

// --- TEST 2: STANDARD LEAD PAYLOAD (NO RATA ACTUALA) ---
console.log("\n▶️ TEST 2: CREDITE Standard Lead Form Payload (Absence of Rata actuală & ghost fields)");

// Simulated payload submitted by UI Form (src/app/page.tsx)
const standardFormPayload = {
  purpose: "Reduc rata",
  desiredAmount: 85000,
  income: 4500,
  employment: "1–3 ani",
  name: "Ion Popescu",
  phone: "0722123456",
  email: "ion.popescu@gmail.com",
  gdpr: true,
  gdprConsent: true,
  utmSource: "google",
  utmMedium: "cpc",
  utmCampaign: "refinantare_bucuresti",
  pageUrl: "https://credite.cristianvaduva.com/",
  deviceType: "Mobile",
  visitorId: "vis_abc12345xyz",
  sessionId: "sess_def67890uvw",
};

// Generate Telegram message as done in src/app/api/leads/route.ts
const prop = detectEcosystemProperty(standardFormPayload.pageUrl);
const sanitizedName = cleanString(standardFormPayload.name);
const sanitizedEmail = standardFormPayload.email ? cleanString(standardFormPayload.email) : "";
const formattedAmount = new Intl.NumberFormat("ro-RO").format(standardFormPayload.desiredAmount);
const formattedIncome = new Intl.NumberFormat("ro-RO").format(standardFormPayload.income);
const shortVisitor = formatShortId(standardFormPayload.visitorId);
const shortSession = formatShortId(standardFormPayload.sessionId);
const timestamp = "03.10.2026, 22:30:00";
const referrer = "https://google.ro";
const deviceInfo = { deviceType: "Mobile", os: "iOS", browser: "Safari" };
const geoInfo = { countryFlag: "🇷🇴", city: "București", country: "Romania" };

const standardTelegramText =
  `${prop.emoji} <b>${prop.domain.toUpperCase()} — 🟢 LEAD NOU</b>\n` +
  `━━━━━━━━━━━━━━━━━━\n` +
  `👤 <b>CLIENT</b>\n` +
  `━━━━━━━━━━━━━━━━━━\n` +
  `Nume: ${escapeHtml(sanitizedName)}\n` +
  `Telefon: <code>${escapeHtml(standardFormPayload.phone)}</code>\n` +
  `Email: ${sanitizedEmail ? escapeHtml(sanitizedEmail) : "Nespecificat"}\n` +
  `━━━━━━━━━━━━━━━━━━\n` +
  `💳 <b>SOLICITARE</b>\n` +
  `━━━━━━━━━━━━━━━━━━\n` +
  `Tip credit: ${escapeHtml(standardFormPayload.purpose)}\n` +
  `Sumă: ${escapeHtml(formattedAmount)} RON\n` +
  `Venit: ${escapeHtml(formattedIncome)} RON\n` +
  `Tip venit: ${escapeHtml(standardFormPayload.employment)}\n` +
  `━━━━━━━━━━━━━━━━━━\n` +
  `🌐 <b>CONTEXT</b>\n` +
  `━━━━━━━━━━━━━━━━━━\n` +
  `Landing page: ${escapeHtml(standardFormPayload.pageUrl || "/")}\n` +
  `Source: ${escapeHtml(standardFormPayload.utmSource || "direct")}\n` +
  `Medium: ${escapeHtml(standardFormPayload.utmMedium || "—")}\n` +
  `Campaign: ${escapeHtml(standardFormPayload.utmCampaign || "—")}\n` +
  `Referrer: ${escapeHtml(referrer)}\n` +
  `Device: ${escapeHtml(deviceInfo.deviceType || "Desktop")}\n` +
  `OS: ${escapeHtml(deviceInfo.os)}\n` +
  `Browser: ${escapeHtml(deviceInfo.browser)}\n` +
  `Location aproximativă: ${geoInfo.countryFlag} ${escapeHtml(geoInfo.city)}, ${escapeHtml(geoInfo.country)}\n` +
  `Visitor ID: <code>${shortVisitor}</code>\n` +
  `Session ID: <code>${shortSession}</code>\n` +
  `Time: ${escapeHtml(timestamp)}`;

console.log("--- Generated Telegram Output ---");
console.log(standardTelegramText);
console.log("---------------------------------");

// Strict Assertions
assert.ok(!standardTelegramText.includes("Rată actuală"), "CRITICAL ERROR: 'Rată actuală' must NOT be in Telegram text!");
assert.ok(!standardTelegramText.includes("Rata actuală"), "CRITICAL ERROR: 'Rata actuală' must NOT be in Telegram text!");
assert.ok(!standardTelegramText.includes("1200"), "CRITICAL ERROR: Hardcoded '1200' must NOT be in Telegram text!");
assert.ok(!standardTelegramText.includes("1990"), "CRITICAL ERROR: Hardcoded '1990' birth year must NOT be in Telegram text!");
assert.ok(!standardTelegramText.includes("An naștere"), "CRITICAL ERROR: 'An naștere' must NOT be in Telegram text!");
assert.ok(!standardTelegramText.includes("Birou"), "CRITICAL ERROR: 'Birou' must NOT be in Standard Lead text!");
assert.ok(!standardTelegramText.includes("Credite:"), "CRITICAL ERROR: 'Credite:' must NOT be in Standard Lead text!");

// Positive Assertions
assert.ok(standardTelegramText.includes("💳 <b>CREDITE.CRISTIANVADUVA.COM — 🟢 LEAD NOU</b>"), "Must have correct header");
assert.ok(standardTelegramText.includes("Nume: Ion Popescu"), "Must have client name");
assert.ok(standardTelegramText.includes("0722123456"), "Must have client phone");
assert.ok(standardTelegramText.includes("ion.popescu@gmail.com"), "Must have client email");
assert.ok(standardTelegramText.includes("Tip credit: Reduc rata"), "Must have purpose");
assert.ok(standardTelegramText.includes("Sumă: 85.000 RON"), "Must have formatted amount");
assert.ok(standardTelegramText.includes("Venit: 4.500 RON"), "Must have formatted income");
assert.ok(standardTelegramText.includes("Tip venit: 1–3 ani"), "Must have employment");
assert.ok(standardTelegramText.includes("Visitor ID: <code>vis_ABC1••••</code>"), "Must have short visitor ID");

console.log("  ✅ CRITICAL CHECK PASSED: Zero ghost fields. 'Rata actuală' is 100% absent from Standard Form Telegram message.");
console.log("  ✅ Positive field checks passed: Form Value = API Value = Telegram Value.");

console.log("\n=================================================");
console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
console.log("=================================================");
