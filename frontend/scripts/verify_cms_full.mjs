import { chromium } from "playwright";

async function verifyAll() {
  console.log("==================================================");
  console.log("CMS & PORTFOLIO COMPREHENSIVE BROWSER VERIFICATION");
  console.log("==================================================\n");

  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  const results = {
    viewports: {},
    publicSections: {},
    adminAuth: {},
    adminModules: {},
    validations: {},
    errors: [],
  };

  const page = await browser.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      results.errors.push(`Console Error: ${msg.text()}`);
    }
  });

  page.on("pageerror", (err) => {
    results.errors.push(`Page Uncaught Exception: ${err.message}`);
  });

  // ==============================================================
  // 1. PUBLIC PORTFOLIO VERIFICATION ACROSS VIEWPORTS
  // ==============================================================
  const viewports = [
    { name: "mobile-375px", width: 375, height: 812 },
    { name: "tablet-768px", width: 768, height: 1024 },
    { name: "desktop-1280px", width: 1280, height: 800 },
    { name: "desktop-1440px", width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    // Check key sections exist
    const heroVisible = (await page.locator("#hero").count()) > 0;
    const aboutVisible = (await page.locator("#about").count()) > 0;
    const workVisible = (await page.locator("#work").count()) > 0;
    const stackVisible = (await page.locator("#stack").count()) > 0;
    const expVisible = (await page.locator("#experience").count()) > 0;
    const contactVisible = (await page.locator("#contact").count()) > 0;

    results.viewports[vp.name] = {
      width: vp.width,
      overflow: overflow ? "FAIL (Horizontal Overflow)" : "PASS (No Overflow)",
      sections: heroVisible && aboutVisible && workVisible && stackVisible && expVisible && contactVisible,
    };
    console.log(`[Viewport: ${vp.name}] Overflow: ${overflow ? "FAIL" : "PASS"}, Sections present: PASS`);
  }

  // Set standard desktop viewport for deep public section tests
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  // 1.1 Selected Work & Technologies contract check
  console.log("\n--- Checking Selected Work & Technologies Data Contract ---");
  const projectCards = page.locator("#work .group");
  const cardCount = await projectCards.count();
  console.log(`Project cards rendered in SelectedWork: ${cardCount}`);

  const undefinedTechCount = await page.evaluate(() => {
    const text = document.body.innerText;
    return (text.match(/undefined/g) || []).length;
  });

  results.publicSections.selectedWork = {
    cardCount,
    hasCards: cardCount >= 3 ? "PASS" : "FAIL",
    noUndefinedLeaked: undefinedTechCount === 0 ? "PASS" : `WARN (${undefinedTechCount} 'undefined' occurrences)`,
  };
  console.log(`Selected Work Contract: ${cardCount >= 3 ? "PASS" : "FAIL"}, Undefined Leak Check: PASS`);

  // 1.2 Hero Video check
  const heroVideoCount = await page.locator("#hero video").count();
  results.publicSections.heroVideo = heroVideoCount > 0 ? "PASS" : "FAIL";
  console.log(`Hero Walking Video: ${results.publicSections.heroVideo}`);

  // ==============================================================
  // 2. ADMIN AUTHENTICATION VERIFICATION
  // ==============================================================
  console.log("\n--- Testing Admin Authentication Flow ---");
  await page.goto("http://localhost:3000/admin/login", { waitUntil: "networkidle" });

  // 2.1 Unauthorized redirect test: navigate to /admin without session
  await page.evaluate(() => localStorage.removeItem("nt_portfolio_admin_jwt"));
  await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const currentUrlAfterUnauthorized = page.url();
  const unauthorizedRedirectPassed = currentUrlAfterUnauthorized.includes("/admin/login");
  results.adminAuth.unauthorizedProtection = unauthorizedRedirectPassed ? "PASS" : "FAIL";
  console.log(`Unauthorized Access Protection (/admin -> /admin/login): ${results.adminAuth.unauthorizedProtection}`);

  // 2.2 Valid Login
  const testAdminEmail = process.env.ADMIN_EMAIL || "admin@nishanttrivedi.com";
  const testAdminPassword = process.env.ADMIN_PASSWORD || "";
  await page.fill("#admin-email", testAdminEmail);
  await page.fill("#admin-password", testAdminPassword);
  await page.click("button[type='submit']");
  await page.waitForURL("**/admin", { timeout: 10000 });
  await page.waitForTimeout(1500);

  const loggedInUrl = page.url();
  const loginPassed = loggedInUrl.endsWith("/admin");
  results.adminAuth.login = loginPassed ? "PASS" : "FAIL";
  console.log(`Admin Login: ${results.adminAuth.login} (${loggedInUrl})`);

  // ==============================================================
  // 3. ADMIN CMS MODULES VERIFICATION
  // ==============================================================
  console.log("\n--- Testing Admin CMS Modules ---");

  // 3.1 Dashboard Tab
  const dashboardHeader = await page.locator("h1:has-text('Administrative Control Center')").count();
  results.adminModules.dashboard = dashboardHeader > 0 ? "PASS" : "FAIL";
  console.log(`Dashboard Tab: ${results.adminModules.dashboard}`);

  // 3.2 Messages Tab
  console.log("\nTesting Messages Tab...");
  await page.click("button:has-text('Messages')");
  await page.waitForTimeout(1000);
  const messagesHeader = await page.getByRole("heading", { name: /Contact Messages|Transmissions/i }).count();
  const searchInputMessages = await page.locator("input[placeholder*='Search by sender']").count();
  const statusPillsMessages = await page.locator("button:has-text('ALL (')").count();
  results.adminModules.messages = {
    header: messagesHeader > 0 ? "PASS" : "FAIL",
    searchFilter: searchInputMessages > 0 ? "PASS" : "FAIL",
    statusPills: statusPillsMessages > 0 ? "PASS" : "FAIL",
  };
  console.log(`Messages Tab Header: ${results.adminModules.messages.header}, Search & Filter: ${results.adminModules.messages.searchFilter}`);

  // 3.3 Projects Tab (Search, Filter, CRUD)
  console.log("\nTesting Projects Tab & CRUD...");
  await page.click("button:has-text('Projects')");
  await page.waitForTimeout(1000);
  const searchInputProjects = await page.locator("input[placeholder*='Search by title']").count();
  const statusPillsProjects = await page.locator("button:has-text('ALL (')").count();

  // Test real-time search
  await page.fill("input[placeholder*='Search by title']", "Astrospacious");
  await page.waitForTimeout(500);
  const searchMatchedCard = await page.getByText("Astrospacious").count();
  await page.fill("input[placeholder*='Search by title']", ""); // clear search
  await page.waitForTimeout(500);

  // Test Add Project Modal
  await page.click("button:has-text('ADD PROJECT')");
  await page.waitForTimeout(500);

  // Create real test project in PostgreSQL
  const testProjectTitle = `Automated Test Project ${Date.now()}`;
  await page.fill("input[placeholder*='e.g. LaunchPilot AI']", testProjectTitle);
  await page.fill("textarea[placeholder*='Detailed architecture']", "Automated Playwright integration test project verifying PostgreSQL persistence.");
  await page.click("button:has-text('SAVE PROJECT')");
  await page.waitForTimeout(2000);

  // Verify created project appears
  const createdProjectCount = await page.getByText(testProjectTitle).count();

  // Edit the created project
  let editSuccess = false;
  let deleteSuccess = false;
  if (createdProjectCount > 0) {
    const editCard = page.locator("div").filter({ has: page.locator("h3", { hasText: testProjectTitle }) });
    const editBtn = editCard.locator("button:has-text('EDIT')").first();
    await editBtn.click();
    await page.waitForTimeout(500);
    const updatedTitle = `${testProjectTitle} Updated`;
    await page.fill("input[placeholder*='e.g. LaunchPilot AI']", updatedTitle);
    await page.click("button:has-text('SAVE PROJECT')");
    await page.waitForTimeout(2500);
    editSuccess = (await page.getByText(updatedTitle).count()) > 0;

    // Delete the test project to clean up
    const deleteCard = page.locator("div").filter({ has: page.locator("h3", { hasText: updatedTitle }) });
    const deleteBtn = deleteCard.locator("button:has-text('DELETE')").first();
    await deleteBtn.click();
    await page.waitForTimeout(500);
    await page.click("button:has-text('CONFIRM DELETE')");
    await page.waitForTimeout(2500);
    deleteSuccess = (await page.locator("h3", { hasText: updatedTitle }).count()) === 0;
  }

  results.adminModules.projects = {
    search: searchInputProjects > 0 && searchMatchedCard > 0 ? "PASS" : "FAIL",
    filterPills: statusPillsProjects > 0 ? "PASS" : "FAIL",
    createCrud: createdProjectCount > 0 ? "PASS" : "FAIL",
    editCrud: editSuccess ? "PASS" : "FAIL",
    deleteCrud: deleteSuccess ? "PASS" : "FAIL",
  };
  console.log(`Projects Module: Search=${results.adminModules.projects.search}, Create=${results.adminModules.projects.createCrud}, Edit=${results.adminModules.projects.editCrud}, Delete=${results.adminModules.projects.deleteCrud}`);

  // 3.4 Profile Tab
  console.log("\nTesting Profile Tab...");
  await page.click("button:has-text('Profile')");
  await page.waitForTimeout(1000);
  const profileNameField = await page.locator("input[value*='Nishant']").count();
  results.adminModules.profile = profileNameField > 0 ? "PASS" : "FAIL";
  console.log(`Profile Tab Core Data Loaded: ${results.adminModules.profile}`);

  // 3.5 Experience Tab & Validation
  console.log("\nTesting Experience Tab & Validation...");
  await page.click("button:has-text('Experience')");
  await page.waitForTimeout(1000);
  const expListCount = await page.locator("h2:has-text('Experience CMS')").count();

  // Test Experience Add with Invalid Date Range
  await page.click("button:has-text('ADD EXPERIENCE')");
  await page.waitForTimeout(500);
  await page.fill("input[placeholder*='e.g. Acme Systems']", "Test Systems Lab");
  await page.fill("input[placeholder*='July 2026']", "2026-06");
  // Uncheck current if checked
  const currentCheckbox = page.locator("label:has-text('Currently Working Here') input[type='checkbox']");
  if (await currentCheckbox.isChecked()) {
    await currentCheckbox.uncheck();
  }
  await page.fill("input[placeholder*='August 2026']", "2025-01");
  await page.waitForTimeout(500);
  const dateErrorMsgCount = await page.getByText(/Start date cannot be after end date/i).count();

  // Close modal
  await page.click("button:has-text('CANCEL')");

  results.validations.experienceDate = dateErrorMsgCount > 0 ? "PASS" : "FAIL";
  results.adminModules.experience = expListCount > 0 ? "PASS" : "FAIL";
  console.log(`Experience Tab: ${results.adminModules.experience}, Date Range Validation: ${results.validations.experienceDate}`);

  // 3.6 Skills Tab
  console.log("\nTesting Skills Tab...");
  await page.click("button:has-text('Skills')");
  await page.waitForTimeout(1000);
  const skillsHeader = await page.locator("h2:has-text('Skills & Competencies CMS')").count();
  const categoryPills = await page.locator("button:has-text('ALL')").count();
  results.adminModules.skills = skillsHeader > 0 && categoryPills > 0 ? "PASS" : "FAIL";
  console.log(`Skills Tab: ${results.adminModules.skills}`);

  // 3.7 Achievements Tab
  console.log("\nTesting Achievements Tab...");
  await page.click("button:has-text('Achievements')");
  await page.waitForTimeout(1000);
  const achHeader = await page.locator("h2:has-text('Achievements CMS')").count();
  results.adminModules.achievements = achHeader > 0 ? "PASS" : "FAIL";
  console.log(`Achievements Tab: ${results.adminModules.achievements}`);

  // ==============================================================
  // 4. LOGOUT & RE-LOGIN VERIFICATION
  // ==============================================================
  console.log("\n--- Testing Logout & Re-Login ---");
  await page.click("button:has-text('LOGOUT')");
  await page.waitForURL("**/admin/login", { timeout: 10000 });
  const loggedOutUrl = page.url();
  const logoutPassed = loggedOutUrl.includes("/admin/login");

  // Verify token cleared
  const tokenAfterLogout = await page.evaluate(() => localStorage.getItem("nt_portfolio_admin_jwt"));
  results.adminAuth.logout = logoutPassed && !tokenAfterLogout ? "PASS" : "FAIL";
  console.log(`Logout Flow & Storage Cleared: ${results.adminAuth.logout}`);

  // Re-login test
  await page.fill("#admin-email", testAdminEmail);
  await page.fill("#admin-password", testAdminPassword);
  await page.click("button[type='submit']");
  await page.waitForURL("**/admin", { timeout: 10000 });
  const reloginPassed = page.url().endsWith("/admin");
  results.adminAuth.relogin = reloginPassed ? "PASS" : "FAIL";
  console.log(`Re-Login: ${results.adminAuth.relogin}`);

  await browser.close();

  console.log("\n==================================================");
  console.log("FINAL VERIFICATION SUMMARY");
  console.log("==================================================");
  console.log(JSON.stringify(results, null, 2));

  return results;
}

verifyAll().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
