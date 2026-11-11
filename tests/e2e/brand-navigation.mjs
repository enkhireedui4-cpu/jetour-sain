import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:3211";
const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const screenshots = "docs/review/2026-11-11-brand-navigation";
await mkdir(screenshots, { recursive: true });
const names = ["JETOUR", "SOUEAST", "CHERY", "BYD", "RIDDARA", "AITO", "212", "FAW BESTUNE", "CHERY RELY", "MAXUS", "FAW HONGQI"];

try {
  for (const route of ["/", "/models/t2"]) {
    // Hero video keeps fetching media ranges; the navbar's effect-driven API is a
    // reliable hydration boundary instead of waiting for global network silence.
    const modelsReady = page.waitForResponse(response => response.url().endsWith("/api/public/models") && response.ok());
    await page.goto(base + route, { waitUntil: "domcontentloaded" });
    await modelsReady;
    const footer = page.locator("footer");
    assert.equal(await footer.getByRole("link", { name: "SAIN Motors", exact: true }).getAttribute("href"), "https://sainmotors.mn/mn/");
    assert.equal(await footer.getByRole("link", { name: "Бусад брэндүүд" }).getAttribute("href"), "https://sainmotors.mn/mn/brands/");
    const header = page.locator("header").first();
    assert.equal(await header.getByRole("link", { name: "SAIN Motors — Компанийн сайт", exact: true }).getAttribute("href"), "https://sainmotors.mn/mn/");
    assert.equal(await header.getByRole("link", { name: "JETOUR — Нүүр хуудас", exact: true }).getAttribute("href"), "/");
    const trigger = header.getByRole("button", { name: "Бусад брэндүүд", exact: true });
    const initialHeight = await header.evaluate(el => el.offsetHeight);
    await trigger.focus();
    await page.keyboard.press("Enter");
    assert.equal(await trigger.getAttribute("aria-expanded"), "true");
    const panel = header.locator("#desktop-brands");
    await panel.waitFor({ state: "visible" });
    await page.screenshot({ path: `${screenshots}/jetour-open-${route === "/" ? "home" : "t2"}.png`, animations: "disabled" });
    assert.equal(await header.evaluate(el => el.offsetHeight), initialHeight, "opening brands must not change header height");
    assert.equal(await panel.locator("li").count(), 11);
    assert.deepEqual(await panel.locator("[data-brand-name]").allTextContents(), names);
    assert.equal(await panel.locator("li").first().locator("a").count(), 0);
    assert.match(await panel.locator("li").first().textContent(), /Одоо үзэж байна/);
    assert.equal(await panel.getByRole("link", { name: "Бүх брэндийг үзэх" }).getAttribute("href"), "https://sainmotors.mn/mn/brands/");
    await page.keyboard.press("Tab");
    assert.equal(await panel.locator(":focus").count(), 1);
    await page.keyboard.press("Escape");
    assert.equal(await trigger.getAttribute("aria-expanded"), "false");
    assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
    await page.keyboard.press("Enter");
    await page.keyboard.press("Shift+Tab");
    assert.equal(await trigger.getAttribute("aria-expanded"), "false", "leaving the disclosure closes it");
    await panel.locator("a").first().focus();
    assert.equal(await panel.locator(":focus").count(), 0, "inert closed panel links cannot take focus");
    await trigger.focus();
    await page.keyboard.press("Space");
    await page.locator("main").first().click({ position: { x: 5, y: 100 }, force: true });
    assert.equal(await trigger.getAttribute("aria-expanded"), "false");

    for (const width of [360, 390, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => window.scrollTo(0, 0));
      const geometry = await header.evaluate(el => {
        const visible = [...el.querySelectorAll('a,button')].filter(n => n.getClientRects().length && getComputedStyle(n).visibility !== 'hidden');
        return visible.map(n => ({ text: n.getAttribute('aria-label') || n.textContent, x: n.getBoundingClientRect().x, right: n.getBoundingClientRect().right }));
      });
      assert.ok(geometry.every(rect => rect.x >= -1 && rect.right <= width + 1), `${route}@${width} header overflow: ${JSON.stringify(geometry)}`);
      const row = await header.locator(":scope > div").first().evaluate(el => [...el.children].filter(n => n.getClientRects().length).map(n => ({ x: n.getBoundingClientRect().left, right: n.getBoundingClientRect().right })));
      assert.ok(row.slice(1).every((rect, i) => rect.x >= row[i].right - 1), `${route}@${width} header items overlap`);
      if (width < 1280) {
        assert.equal(await trigger.isVisible(), false);
        const hamburger = header.getByRole("button", { name: "Цэс нээх", exact: true });
        await hamburger.click();
        assert.equal(await page.locator(".fcta").isVisible(), false, "floating contact must not cover drawer links or sales button");
        const mobile = header.getByRole("navigation", { name: "Мобайл цэс", exact: true });
        const accordion = mobile.getByRole("button", { name: "Бусад брэндүүд", exact: true });
        await accordion.click();
        const list = mobile.locator("#mobile-brands");
        assert.equal(await list.locator("li").count(), 11);
        assert.equal(await list.locator("li a").count(), 10);
        const heights = await list.locator("li > *").evaluateAll(elements => elements.map(el => el.getBoundingClientRect().height));
        assert.ok(heights.every(h => h >= 44), `mobile touch targets ${heights}`);
        await list.getByRole("link", { name: "FAW HONGQI", exact: true }).scrollIntoViewIfNeeded();
        assert.equal(await list.getByRole("link", { name: "FAW HONGQI", exact: true }).isVisible(), true);
        if (width === 390 && route === "/") await page.screenshot({ path: `${screenshots}/jetour-mobile.png`, animations: "disabled" });
        await page.keyboard.press("Escape");
        assert.equal(await hamburger.isVisible(), true);
      } else {
        await trigger.click();
        await panel.waitFor({ state: "visible" });
        const bounds = await panel.boundingBox();
        assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width);
        assert.equal(bounds.width, 400);
        if (width === 1440 && route === "/") await page.screenshot({ path: `${screenshots}/jetour-desktop.png`, animations: "disabled" });
        await header.getByRole("link", { name: "Загварууд", exact: true }).hover();
        assert.equal(await trigger.getAttribute("aria-expanded"), "false");
        await page.keyboard.press("Escape");
      }
    }
    await header.getByRole("button", { name: "Зөвлөгөө авах", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    assert.equal(await dialog.locator("input").count(), 2, "sales form remains available");
    await dialog.getByRole("button", { name: "Хаах", exact: true }).click();
    if (route === "/") {
      const carousel = page.locator('[aria-roledescription="carousel"][aria-label="JETOUR загварууд"]');
      const secondSlide = carousel.locator("button[aria-current]").nth(1);
      await secondSlide.click();
      assert.equal(await secondSlide.getAttribute("aria-current"), "true", "hero carousel remains interactive");
    }
    await page.setViewportSize({ width: 1280, height: 320 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await trigger.click();
    await panel.getByRole("link", { name: "Бүх брэндийг үзэх" }).scrollIntoViewIfNeeded();
    const shortBounds = await panel.boundingBox();
    assert.ok(shortBounds.y >= 0 && shortBounds.y + shortBounds.height <= 320, "short-viewport panel fits and scrolls");
    const reducedDurations = await panel.evaluate(el => getComputedStyle(el).transitionDuration.split(",").map(value => parseFloat(value)));
    assert.ok(reducedDurations.every(seconds => seconds <= 0.001), "reduced motion disables disclosure transition");
    await page.keyboard.press("Escape");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1440, height: 1000 });
    console.log(`PASS ${route}: responsive logo links, desktop disclosure, keyboard, outside click, current brand, mobile accordion`);
  }
} finally {
  await browser.close();
}
