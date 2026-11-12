import { expect, test } from "@playwright/test";

test("compact layouts fit phones, landscape, tablets and wide monitors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const [width, height] of [[320, 568], [360, 640], [390, 844], [568, 320], [600, 800], [667, 375], [700, 900], [768, 1024], [844, 390], [1024, 768], [1440, 900], [2560, 1440]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    const layout = await page.evaluate(() => {
      const overlap = (a: Element, b: Element) => {
        const x = a.getBoundingClientRect(), y = b.getBoundingClientRect();
        return x.left < y.right && x.right > y.left && x.top < y.bottom && x.bottom > y.top;
      };
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        clipped: Array.from(document.querySelectorAll("h1,h2,h3,h4,p,.loadout-name,.finale-email,.inventory-items li")).filter(e => e.clientWidth && e.scrollWidth > e.clientWidth + 2).map(e => e.textContent),
        controlsOverlap: overlap(document.querySelector(".world-light-controls")!, document.querySelector(".experience-controls")!),
        heroOverlap: overlap(document.querySelector(".hero-actions")!, document.querySelector(".hero-run-track")!),
        heights: Object.fromEntries(["home", "about", "skills"].map(id => [id, document.getElementById(id)!.getBoundingClientRect().height])),
      };
    });
    expect(layout.overflow, `${width}x${height}: horizontal overflow`).toBe(false);
    expect(layout.clipped, `${width}x${height}: clipped text`).toEqual([]);
    expect(layout.controlsOverlap, `${width}x${height}: lighting and fixed controls overlap`).toBe(false);
    expect(layout.heroOverlap, `${width}x${height}: hero action and Byte overlap`).toBe(false);
    if (width <= 390) {
      expect(layout.heights.home).toBeLessThanOrEqual(700);
      expect(layout.heights.about).toBeLessThan(850);
      // Larger technology logos and readable labels need more room on phones.
      expect(layout.heights.skills).toBeLessThan(1100);
    }
    for (const category of ["Frontend", "Backend", "Tools"]) {
      await page.getByRole("tab", { name: category, exact: true }).click();
      await expect(page.getByRole("tabpanel")).toBeVisible();
      expect(await page.getByRole("tabpanel").evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
    }
  }
});

test("compact navigation is reachable and dismissible on phone and tablet", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [width, height] of [[320, 568], [568, 320], [768, 1024], [844, 390]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    const toggle = page.getByRole("button", { name: "Open navigation" });
    await toggle.click();
    await expect(page.getByRole("navigation")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.getByRole("navigation").getByRole("link", { name: "The toolkit" }).click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.locator("#skills")).toBeInViewport();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  }
});

test("project details scroll on small screens with the close control reachable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [width, height] of [[320, 568], [390, 844], [844, 390]]) {
    await page.setViewportSize({ width, height });
    await page.getByRole("button", { name: "View MJ Properties project" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.evaluate(e => { e.scrollTop = e.scrollHeight; });
    await expect(dialog.getByRole("link", { name: "Explore live project" })).toBeInViewport();
    await expect(page.getByRole("button", { name: "Close project" })).toBeInViewport();
    expect(await dialog.evaluate(e => e.scrollWidth <= e.clientWidth)).toBe(true);
    await page.getByRole("button", { name: "Close project" }).click();
    await expect(dialog).not.toBeVisible();
  }
});
