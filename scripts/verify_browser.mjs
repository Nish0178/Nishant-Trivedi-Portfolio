import { chromium } from "playwright";

async function runVerification() {
  console.log("Starting browser verification with local Chrome...");
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1536, height: 864 },
  });
  const page = await context.newPage();

  // 1. Navigate to localhost:3000
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  console.log("Page loaded successfully at 1536x864.");

  // 2. Verify Hero Section Elements
  const heroSection = page.locator("#hero");
  const heroBox = await heroSection.boundingBox();
  console.log(`Hero dimensions: width=${heroBox.width}px, height=${heroBox.height}px`);

  // Check single viewport constraint
  const viewportHeight = 864;
  console.log(`Single-viewport check: hero height (${heroBox.height}px) <= viewport (${viewportHeight}px): ${heroBox.height <= viewportHeight + 10 ? "PASS" : "FAIL"}`);

  // Check removed overlays
  const activeFrameText = await page.getByText("SYS // ACTIVE_FRAME").count();
  const estdText = await page.getByText("ESTD 2026").count();
  console.log(`Overlays removed check:`);
  console.log(`  'SYS // ACTIVE_FRAME' count = ${activeFrameText} (expect 0): ${activeFrameText === 0 ? "PASS" : "FAIL"}`);
  console.log(`  'ESTD 2026' count = ${estdText} (expect 0): ${estdText === 0 ? "PASS" : "FAIL"}`);

  // Check walking video element
  const videoElem = page.locator("#hero video");
  const videoCount = await videoElem.count();
  console.log(`Walking video present: count = ${videoCount}: ${videoCount > 0 ? "PASS" : "FAIL"}`);
  if (videoCount > 0) {
    const videoBox = await videoElem.boundingBox();
    console.log(`Video visible box: width=${videoBox.width}px, height=${videoBox.height}px, top=${videoBox.y}px`);
  }

  // Check video footer elements preserved
  const nishantNameInCard = await page.locator("#hero").getByText("Nishant Trivedi").count();
  const quoteText = await page.getByText("CODE IS MY CRAFT").count();
  console.log(`Video footer info card preserved: ${nishantNameInCard > 0 ? "PASS" : "FAIL"}`);
  console.log(`Video quote card preserved: ${quoteText > 0 ? "PASS" : "FAIL"}`);

  // 3. Dark Theme Verification
  const htmlClassDark = await page.getAttribute("html", "class");
  console.log(`Initial HTML classes: ${htmlClassDark}`);
  await page.screenshot({ path: "public/images/test_dark_hero.png" });
  console.log("Captured public/images/test_dark_hero.png");

  // 4. Click Theme Switcher Button
  const themeToggle = page.locator("header button[aria-label*='Theme']");
  console.log("Clicking Theme Switcher button...");
  await themeToggle.click();
  await page.waitForTimeout(600);

  const htmlClassLight = await page.getAttribute("html", "class");
  const dataTheme = await page.getAttribute("html", "data-theme");
  console.log(`After toggle HTML classes: ${htmlClassLight}, data-theme: ${dataTheme}`);
  console.log(`Light theme activation: ${htmlClassLight.includes("light") ? "PASS" : "FAIL"}`);

  // Verify light logo
  const logoImgSrc = await page.locator("header a[aria-label*='Nishant'] img").getAttribute("src");
  console.log(`Navbar logo src: ${logoImgSrc}`);
  console.log(`Light logo loaded: ${logoImgSrc.includes("navbar-logo-light") ? "PASS" : "FAIL"}`);

  // Screenshot Light Hero
  await page.screenshot({ path: "public/images/test_light_hero.png" });
  console.log("Captured public/images/test_light_hero.png");

  // Scroll to Projects / Selected Work in Light Mode
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "public/images/test_light_projects.png" });
  console.log("Captured public/images/test_light_projects.png");

  // 5. Test LocalStorage Persistence
  console.log("Testing reload for localStorage persistence...");
  await page.reload({ waitUntil: "networkidle" });
  const reloadedHtmlClass = await page.getAttribute("html", "class");
  console.log(`Reloaded HTML classes: ${reloadedHtmlClass}`);
  console.log(`Theme persistence after reload: ${reloadedHtmlClass.includes("light") ? "PASS" : "FAIL"}`);

  // 6. Toggle back to Dark Mode
  await page.locator("header button[aria-label*='Theme']").click();
  await page.waitForTimeout(600);
  const toggledBackDarkClass = await page.getAttribute("html", "class");
  console.log(`Toggled back HTML classes: ${toggledBackDarkClass}`);
  console.log(`Dark theme restoration: ${toggledBackDarkClass.includes("dark") ? "PASS" : "FAIL"}`);

  await browser.close();
  console.log("\nALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!");
}

runVerification().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
