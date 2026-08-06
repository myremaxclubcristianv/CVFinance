# 🚀 CV Finance — Production Runbook

This document outlines the standard operating procedures for deploying, monitoring, and maintaining the CV Finance application in a production environment.

## 1. Deployment Process

The application is built on Next.js 16 (App Router) and is optimized for deployment on Vercel, Netlify, or any Node.js hosting provider.

### Pre-Deployment Checklist
- Run `npm run lint` to ensure zero ESLint errors.
- Run `npm run build` to verify the production build succeeds locally.
- Ensure all environment variables are configured in the hosting provider.

### Build Commands
- **Install:** `npm install`
- **Build:** `npm run build`
- **Start:** `npm start`

## 2. Environment Variables

The following environment variables MUST be set in production:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | The primary production domain (e.g., `https://credite.cristianvaduva.com`) | **Yes** |
| `TELEGRAM_BOT_TOKEN` | Token for the Telegram notification bot | **Yes** |
| `TELEGRAM_CHAT_ID` | The Chat ID where leads should be sent | **Yes** |
| `RESEND_API_KEY` | API Key for Resend (Email fallback system) | **Yes** (For fallback) |
| `LEAD_EMAIL_TO` | The email address to receive fallback leads | **Yes** (For fallback) |
| `LEAD_EMAIL_FROM` | The verified domain sender (e.g., `leads@cvfinance.ro`) | **Yes** (For fallback) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) | No |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Meta Pixel ID | No |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking (Not active yet) | No |

*Note: Sentry can be enabled by adding `NEXT_PUBLIC_SENTRY_DSN` and configuring `@sentry/nextjs` in the future. No external dependency is required right now.*

## 3. DNS & Domain Checklist

Before launching to live traffic:
1. **A/CNAME Records**: Point the domain to your hosting provider.
2. **SSL Certificate**: Ensure HTTPS is enforced.
3. **WWW Redirect**: Ensure `www.credite.cristianvaduva.com` redirects to `credite.cristianvaduva.com` (or vice-versa) to prevent SEO penalty.

## 4. Testing Lead Flow (Post-Deployment)

Always test the lead flow directly on the live domain before running ads:
1. Complete the multi-step form with test data (use "Test" in the name).
2. Verify the Telegram message arrives instantly.
3. To test the email fallback, temporarily remove the `TELEGRAM_BOT_TOKEN` environment variable, trigger a lead, and verify the email arrives via Resend.

## 5. Analytics Verification

1. Use the **Google Analytics Debugger** extension or look at the Network tab for `collect` requests to verify `page_view`, `form_start`, and `lead_success`.
2. Use the **Meta Pixel Helper** extension to verify the `Lead` event fires only upon successful backend response.

## 6. Rollback Procedure

If a critical bug is discovered in production:
1. Navigate to your hosting provider's dashboard (e.g., Vercel Deployments).
2. Locate the previous stable deployment.
3. Click **"Promote to Production"** or **"Rollback"**.
4. Investigate the failure locally.

## 7. Common Errors

- **Lead Form Returns 429 Too Many Requests:** The user has triggered the rate limiter (5 requests / 15 mins). Legitimate users rarely hit this unless testing.
- **Telegram Fails to Send:** Verify the bot has not been kicked from the target chat and that the `TELEGRAM_CHAT_ID` is correct. The system will automatically fallback to email.
- **Hydration Errors:** Occur if browser extensions modify the DOM before Next.js hydrates. Usually benign, but trackable via Sentry if severe.

## 8. Emergency Contacts
- **Lead System Admin:** [Insert Name/Number]
- **Hosting Provider Support:** [Link to Support]
- **Domain Registrar Support:** [Link to Support]
