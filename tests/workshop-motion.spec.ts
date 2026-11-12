import { expect, test } from "@playwright/test";

test("workshop leaves and Byte move while the building, hills and crate stay anchored", async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 1024 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".finale-above").scrollIntoViewIfNeeded();
  await expect(page.locator(".finale-world")).toHaveAttribute("data-workshop-renderer", "webgl");
  await page.addStyleTag({ content: ".finale-cta,.finale-pollen,.finale-level-label,.finale-player-shadow{visibility:hidden!important}" });
  const art = (await page.locator(".finale-surface-art").boundingBox())!;
  const byte = (await page.locator(".finale-player").boundingBox())!;
  const region = (bounds: typeof art, sourceWidth: number, sourceHeight: number, x: number, y: number, width: number, height: number) => ({
    x: Math.round(bounds.x + x / sourceWidth * bounds.width),
    y: Math.round(bounds.y + y / sourceHeight * bounds.height),
    width: Math.max(2, Math.floor(width / sourceWidth * bounds.width)),
    height: Math.max(2, Math.floor(height / sourceHeight * bounds.height)),
  });
  const areas = {
    leaves: region(art, 1536, 930, 300, 385, 140, 130),
    clouds: region(art, 1536, 930, 1100, 120, 220, 100),
    roof: region(art, 1536, 930, 1325, 435, 100, 65),
    hills: region(art, 1536, 930, 940, 835, 110, 40),
    scarf: region(byte, 627, 627, 40, 265, 200, 110),
    hands: region(byte, 627, 627, 320, 390, 65, 55),
    crate: region(byte, 627, 627, 185, 480, 110, 110),
  };
  await page.waitForTimeout(250);
  const before = new Map<string, Buffer>();
  for (const [name, clip] of Object.entries(areas)) before.set(name, await page.screenshot({ clip }));
  await page.waitForTimeout(800);
  for (const [name, clip] of Object.entries(areas)) {
    const unchanged = (await page.screenshot({ clip })).equals(before.get(name)!);
    expect(unchanged, `${name} motion`).toBe(["roof", "hills", "crate"].includes(name));
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  const world = page.locator(".finale-world");
  await page.waitForTimeout(100);
  const stopped = await world.evaluate((element) => element.style.getPropertyValue("--workshop-time"));
  await page.waitForTimeout(250);
  expect(await world.evaluate((element) => element.style.getPropertyValue("--workshop-time"))).toBe(stopped);
  await expect(page.locator(".crystal-sparkle").first()).toHaveCSS("animation-name", "none");
  expect(errors).toEqual([]);
});
