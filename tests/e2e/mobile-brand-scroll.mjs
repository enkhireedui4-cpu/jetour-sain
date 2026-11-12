import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:3211";
const output = "local-mobile-brand-scroll";
const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || "chrome" });
await mkdir(output, { recursive: true });

// A real pointerdown must not let the hidden desktop switcher close the mobile
// accordion. Programmatic scrollIntoView does not exercise this regression.
async function swipe(page, session, direction) {
  const { width, height } = page.viewportSize();
  const x = Math.round(width / 2);
  const from = direction === "up" ? height - 60 : 150;
  const to = direction === "up" ? 150 : height - 60;
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y: from }] });
  try {
    assert.equal(await page.locator('[aria-controls="mobile-brands"]').getAttribute("aria-expanded"), "true", "touching drawer content must keep brands expanded");
    for (let step = 1; step <= 12; step++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: from + (to - from) * step / 12 }] });
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  } finally {
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  }
}

try {
  for (const route of ["/", "/models/t2"]) {
    for (const viewport of [{ width: 366, height: 868 }, { width: 390, height: 640 }]) {
      const context = await browser.newContext({ viewport, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        const modelsReady = page.waitForResponse(response => response.url().endsWith("/api/public/models") && response.ok());
        await page.goto(base + route, { waitUntil: "domcontentloaded" });
        await modelsReady;
        const menu = page.getByRole("button", { name: "Цэс нээх", exact: true });
        await menu.tap();
        const accordion = page.locator('#mobile-navigation [aria-controls="mobile-brands"]');
        await accordion.tap();
        const drawer = page.locator("#mobile-navigation");
        const brands = drawer.locator("#mobile-brands");
        assert.equal(await brands.locator("li").count(), 11);
        const session = await context.newCDPSession(page);
        const before = await drawer.evaluate(el => el.scrollTop);
        await swipe(page, session, "up");
        await page.waitForFunction(before => document.querySelector("#mobile-navigation").scrollTop > before, before);
        for (let i = 0; i < 4; i++) await swipe(page, session, "up");
        const last = brands.getByRole("link", { name: "FAW HONGQI", exact: true });
        const bounds = await last.boundingBox();
        assert.ok(bounds && bounds.y >= 64 && bounds.y + bounds.height <= viewport.height, "finger swipes must reach the last brand");
        await page.screenshot({ path: `${output}/${route === "/" ? "home" : "t2"}-${viewport.width}.png` });

        // Exercise a real brand tap while keeping navigation local to this test.
        await context.route("https://sainmotors.mn/mn/brands/hongqi/", request => request.fulfill({ status: 200, contentType: "text/html", body: "<h1>Brand destination</h1>" }));
        await last.tap();
        await page.waitForURL("https://sainmotors.mn/mn/brands/hongqi/");
        assert.deepEqual(errors, [], "no browser runtime errors");
        console.log(`PASS ${route}@${viewport.width}x${viewport.height}: touch scroll reaches all 11 brands and last-brand tap navigates`);
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
