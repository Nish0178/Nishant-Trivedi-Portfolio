import { chromium } from "playwright";
import fs from "fs";

// Read credentials safely from root .env without exposing in logs
const envContent = fs.readFileSync("../.env", "utf-8");
let adminEmail = "";
let adminPassword = "";

for (const line of envContent.split("\n")) {
  const emailMatch = line.match(/^\s*ADMIN_EMAIL\s*=\s*(.*)$/);
  if (emailMatch) adminEmail = emailMatch[1].trim();
  const passMatch = line.match(/^\s*ADMIN_PASSWORD\s*=\s*(.*)$/);
  if (passMatch) adminPassword = passMatch[1].trim();
}

console.log("=== VERIFICATION SETUP ===");
console.log("Admin Email loaded:", adminEmail ? `${adminEmail.substring(0, 3)}***@***` : "MISSING");
console.log("Admin Password loaded:", Boolean(adminPassword));

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  let overallSuccess = true;

  try {
    // =========================================================================
    // 1. PUBLIC PORTFOLIO VERIFICATION AT 375, 768, 1280, 1440
    // =========================================================================
    console.log("\n========================================================");
    console.log("1. PUBLIC PORTFOLIO VIEWPORT VERIFICATION");
    console.log("========================================================");

    const viewports = [
      { name: "375px Mobile", width: 375, height: 667 },
      { name: "768px Tablet", width: 768, height: 1024 },
      { name: "1280px Laptop", width: 1280, height: 800 },
      { name: "1440px Desktop", width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });

      const consoleErrors = [];
      const hydrationErrors = [];
      const networkFailures = [];

      page.on("console", (msg) => {
        const text = msg.text();
        if (msg.type() === "error") {
          // Ignore known browser-policy autoplay notices in headless mode
          if (!text.includes("play()") && !text.includes("NotAllowedError") && !text.includes("favicon")) {
            consoleErrors.push(text);
          }
        }
        if (text.toLowerCase().includes("hydration")) {
          hydrationErrors.push(text);
        }
      });

      page.on("requestfailed", (req) => {
        // Ignore favicon 404 if any
        if (!req.url().includes("favicon")) {
          networkFailures.push(`${req.method()} ${req.url()} (${req.failure()?.errorText})`);
        }
      });

      const response = await page.goto("http://localhost:3000", {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      const statusCode = response.status();
      const heroPresent = (await page.locator("#hero, section#hero").count()) > 0;
      const videoPresent = (await page.locator("video").count()) > 0;
      const navPresent = (await page.locator("nav, header").count()) > 0;
      const projectsPresent = (await page.locator("#work, #projects, section[id*='work']").count()) > 0;
      const contactPresent = (await page.locator("#contact, section[id*='contact']").count()) > 0;

      // Scroll through page to verify full dynamic layout rendering
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const pass =
        statusCode === 200 &&
        heroPresent &&
        videoPresent &&
        navPresent &&
        projectsPresent &&
        contactPresent &&
        hydrationErrors.length === 0 &&
        consoleErrors.length === 0;

      if (!pass) overallSuccess = false;

      console.log(`[${vp.name}] Status: HTTP ${statusCode} | Hero: ${heroPresent} | Video: ${videoPresent} | Nav: ${navPresent} | Projects: ${projectsPresent} | Contact: ${contactPresent} | Hydration Errs: ${hydrationErrors.length} | Console Errs: ${consoleErrors.length} | Result: ${pass ? "PASS" : "FAIL"}`);

      if (consoleErrors.length > 0) {
        console.log(`  Console errors on ${vp.name}:`, consoleErrors);
      }
      if (networkFailures.length > 0) {
        console.log(`  Network failures on ${vp.name}:`, networkFailures);
      }

      await page.close();
    }

    // =========================================================================
    // 2. /api/github/repos VERIFICATION
    // =========================================================================
    console.log("\n========================================================");
    console.log("2. GITHUB REPOSITORIES API VERIFICATION");
    console.log("========================================================");

    const apiPage = await browser.newPage();
    const ghRes = await apiPage.goto("http://localhost:3000/api/github/repos");
    const ghStatus = ghRes.status();
    const ghData = await ghRes.json();

    const repos = ghData.projects || [];
    const metaExcluded = !repos.some((r) => r.name.toLowerCase() === "nishant-trivedi-portfolio");
    const firstContribExcluded = !repos.some((r) => r.name.toLowerCase() === "first-contributions");
    const forksExcluded = !repos.some((r) => r.fork === true);
    const launchPilotDedup = repos.filter((r) => r.name.toLowerCase() === "launch-pilot" || r.id === "launchpilot-ai").length === 1;

    console.log(`HTTP Status: ${ghStatus}`);
    console.log(`Repositories Returned: ${repos.length}`);
    console.log(`Meta Repo Excluded: ${metaExcluded}`);
    console.log(`first-contributions Excluded: ${firstContribExcluded}`);
    console.log(`Forks Excluded: ${forksExcluded}`);
    console.log(`LaunchPilot AI Deduplicated: ${launchPilotDedup}`);

    const ghApiPass = ghStatus === 200 && repos.length > 0 && metaExcluded && firstContribExcluded && forksExcluded && launchPilotDedup;
    console.log(`GitHub API Result: ${ghApiPass ? "PASS" : "FAIL"}`);
    if (!ghApiPass) overallSuccess = false;
    await apiPage.close();

    // =========================================================================
    // 3. ADMIN LOGIN & DASHBOARD VERIFICATION
    // =========================================================================
    console.log("\n========================================================");
    console.log("3. ADMIN LOGIN & DASHBOARD AUTHENTICATION VERIFICATION");
    console.log("========================================================");

    const adminPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const adminConsoleErrors = [];
    const adminApiCalls = [];

    adminPage.on("console", (msg) => {
      if (msg.type() === "error") {
        adminConsoleErrors.push(msg.text());
      }
    });

    adminPage.on("response", (res) => {
      if (res.url().includes("/api/admin")) {
        adminApiCalls.push({
          url: res.url(),
          status: res.status(),
          method: res.request().method(),
        });
      }
    });

    // 3a. Open Login UI
    await adminPage.goto("http://localhost:3000/admin/login", { waitUntil: "networkidle" });
    const loginHeader = await adminPage.locator("h1").innerText();
    console.log("Admin Login UI Header:", loginHeader);

    // 3b. Fill Valid Configured Credentials
    await adminPage.fill("#admin-email", adminEmail);
    await adminPage.fill("#admin-password", adminPassword);

    // 3c. Submit Login Form
    console.log("Submitting login form with configured credentials...");
    await adminPage.click("button[type='submit']");

    // 3d. Verify navigation to /admin
    await adminPage.waitForURL("**/admin", { timeout: 15000 });
    console.log("Navigated to Admin Dashboard URL:", adminPage.url());

    // 3e. Verify JWT in localStorage
    const storedToken = await adminPage.evaluate(() => localStorage.getItem("nt_portfolio_admin_jwt"));
    const hasValidToken = Boolean(storedToken && storedToken.length > 20);
    console.log(`JWT in localStorage: ${hasValidToken ? "VALID (length " + storedToken.length + ")" : "MISSING"}`);

    // Wait for Dashboard UI to render
    await adminPage.waitForSelector("main", { timeout: 10000 });
    await adminPage.waitForTimeout(1000);

    const dashboardText = await adminPage.innerText("main");
    const hasDashboardTitle = dashboardText.includes("ADMIN") || dashboardText.includes("Control") || dashboardText.includes("Projects");
    console.log(`Dashboard Content Rendered: ${hasDashboardTitle}`);

    // 3f. Test Projects Tab
    console.log("Testing Projects Tab...");
    const projectsTabBtn = adminPage.locator("aside nav button").filter({ hasText: "Projects" }).first();
    await projectsTabBtn.click();
    await adminPage.waitForSelector("h2:has-text('Project Repository & Showcase'), button:has-text('ADD PROJECT')", { timeout: 10000 });
    const projectsContent = await adminPage.innerText("main");
    const projectsTabPass = projectsContent.includes("Project Repository & Showcase") || projectsContent.includes("ADD PROJECT") || projectsContent.includes("LaunchPilot");
    console.log(`Projects Tab Verified: ${projectsTabPass}`);

    // 3g. Test Messages Tab
    console.log("Testing Messages Tab...");
    const messagesTabBtn = adminPage.locator("aside nav button").filter({ hasText: "Messages" }).first();
    await messagesTabBtn.click();
    await adminPage.waitForSelector("h2, main", { timeout: 10000 });
    await adminPage.waitForTimeout(1000);
    const messagesContent = await adminPage.innerText("main");
    const messagesTabPass = messagesContent.includes("Messages") || messagesContent.includes("Transmission") || messagesContent.includes("Inquiry") || messagesContent.includes("Contact");
    console.log(`Messages Tab Verified: ${messagesTabPass}`);

    // 3h. Check all authenticated API responses
    console.log("Admin API Calls summary:");
    let has401or403 = false;
    for (const call of adminApiCalls) {
      console.log(`  ${call.method} ${call.url} -> HTTP ${call.status}`);
      if (call.status === 401 || call.status === 403) {
        has401or403 = true;
      }
    }

    const adminFlowPass =
      adminPage.url().includes("/admin") &&
      hasValidToken &&
      hasDashboardTitle &&
      projectsTabPass &&
      messagesTabPass &&
      !has401or403 &&
      adminConsoleErrors.length === 0;

    console.log(`Admin Flow Result: ${adminFlowPass ? "PASS" : "FAIL"}`);
    if (!adminFlowPass) overallSuccess = false;

    await adminPage.close();

    console.log("\n========================================================");
    console.log(`OVERALL E2E VERIFICATION: ${overallSuccess ? "ALL CHECKS PASSED (100%)" : "FAILED"}`);
    console.log("========================================================");
  } finally {
    await browser.close();
  }

  process.exit(overallSuccess ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
