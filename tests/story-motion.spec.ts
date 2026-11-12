import { expect, test } from "@playwright/test";

test("the story portrait idles, pauses and respects reduced motion", async ({ page }) => {
  await page.goto("/");
  await page.locator("#about").scrollIntoViewIfNeeded();
  const portrait = page.locator("#about .story-byte");
  await expect(portrait).toHaveAttribute("data-idle-active", "true");
  await expect(portrait).toHaveAccessibleName("Byte the explorer, ready for a new coding adventure");
  const scarf = page.locator("#about .story-scarf");
  const motion = () => scarf.evaluate((element) => getComputedStyle(element).transform);
  const original = await motion();
  await expect.poll(motion).not.toBe(original);
  await page.getByRole("button", { name: "Pause animations", exact: true }).click();
  await expect(scarf).toHaveCSS("animation-play-state", "paused");
  const stopped = await motion();
  await page.waitForTimeout(200);
  expect(await motion()).toBe(stopped);
  await page.getByRole("button", { name: "Resume animations", exact: true }).click();
  await expect.poll(motion).not.toBe(stopped);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(portrait).toHaveCSS("animation-name", "none");
  await expect(scarf).toHaveCSS("animation-name", "none");
  await expect(page.locator("#about .story-eyelids")).toHaveCSS("animation-name", "none");
});

test("the scrolling banner separates phrases with three different Byte expressions", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".ticker-star")).toHaveCount(0);
  await expect(page.locator(".ticker-face")).toHaveCount(6);
  const groups = page.locator(".ticker-track > div");
  for (const group of await groups.all()) {
    expect(await group.locator(".ticker-face").evaluateAll(
      (elements) => elements.map((element) => element.getAttribute("data-expression")),
    )).toEqual(["happy", "wink", "curious"]);
    await expect(group).toContainText("THOUGHTFUL DESIGN");
    await expect(group).toContainText("PLAYFUL POSSIBILITIES");
    await expect(group).toContainText("CODE WITH PURPOSE");
  }
});
