// ui_qa.mjs - Playwright UI QA script for the project
import { chromium } from 'playwright';

(async () => {
  const viewports = [
    { width: 320, height: 800 },
    { width: 375, height: 800 },
    { width: 390, height: 800 },
    { width: 430, height: 800 },
    { width: 768, height: 800 },
    { width: 1024, height: 800 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ];
  const url = 'http://localhost:3000';
  const results = [];

  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const vp of viewports) {
    const page = await context.newPage();
    await page.setViewportSize(vp);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const headerCount = await page.evaluate(() => document.querySelectorAll('header').length);
    const footerCount = await page.evaluate(() => document.querySelectorAll('footer').length);

    let mobileMenuWorks = false;
    if (vp.width < 768) {
      const menuBtn = await page.$('button[aria-controls="mobile-nav-panel"]');
      if (menuBtn) {
        await menuBtn.click();
        await page.waitForTimeout(200);
        const overlay = await page.$('#mobile-nav-panel');
        const overlayVisible = overlay && await overlay.isVisible();
        const overflow = await page.evaluate(() => document.body.style.overflow);
        mobileMenuWorks = overlayVisible && overflow === 'hidden';
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
      }
    }

    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      return docWidth > winWidth;
    });

    const legacyIssues = await page.evaluate(() => {
      const selectors = ['.cv-card', '[class*="card"]', '[class*="shadow"]', '[class*="border-radius"]', '[class*="gradient"]', '[class*="glass"]'];
      const issues = [];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width && rect.height) {
            issues.push(`${sel} (${el.tagName})`);
          }
        });
      });
      return issues;
    });

    results.push({
      viewport: `${vp.width}x${vp.height}`,
      headerCount,
      footerCount,
      mobileMenuWorks,
      overflow,
      legacyIssues,
    });
    await page.close();
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
