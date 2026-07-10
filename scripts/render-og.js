const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto('file://' + path.resolve(__dirname, 'og-image.html'));
  await page.screenshot({ path: path.resolve(__dirname, '../images/og-image.png') });
  await browser.close();
  console.log('done');
})();
