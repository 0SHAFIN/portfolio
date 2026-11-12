import { expect, test } from "@playwright/test";

test("Byte's body stays centered while his footfalls and scarf animate", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute("data-renderer", "webgl");
  const track = page.locator(".hero-run-track");
  const sprite = page.locator(".byte-run-sprite");
  const start = await track.boundingBox();
  const viewportWidth = await page.evaluate(() => innerWidth);
  expect(
    Math.abs(start!.x + start!.width * 0.7 - viewportWidth / 2),
  ).toBeLessThan(1);
  const pose = await sprite.evaluate(
    (element) => getComputedStyle(element).backgroundPosition,
  );
  await expect
    .poll(() =>
      sprite.evaluate(
        (element) => getComputedStyle(element).backgroundPosition,
      ),
    )
    .not.toBe(pose);
  await page
    .getByRole("button", { name: "Say hello to Byte the explorer" })
    .hover();
  const hoveredPose = await sprite.evaluate(
    (element) => getComputedStyle(element).backgroundPosition,
  );
  await expect
    .poll(() =>
      sprite.evaluate(
        (element) => getComputedStyle(element).backgroundPosition,
      ),
    )
    .not.toBe(hoveredPose);
  const end = await track.boundingBox();
  expect(Math.abs(end!.x - start!.x)).toBeLessThan(1);
  const asset = await page.request.get("/art/byte-run-cycle-isolated.webp");
  expect(asset.ok()).toBe(true);
});

test("lighting can change to night and return to day with readable text", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute("data-renderer", "webgl");
  await page
    .getByRole("button", { name: "Set world to night", exact: true })
    .click();
  await page.waitForTimeout(800);
  const earlyLight = await page
    .locator(".portfolio")
    .evaluate((element) =>
      Number(element.style.getPropertyValue("--night-mix")),
    );
  expect(earlyLight).toBeGreaterThan(0);
  expect(earlyLight).toBeLessThan(0.3);
  await expect
    .poll(
      () =>
        page
          .locator(".portfolio")
          .evaluate((element) =>
            Number(element.style.getPropertyValue("--night-mix")),
          ),
      { timeout: 10000 },
    )
    .toBeGreaterThan(0.98);
  await expect(page.locator(".hero")).toHaveAttribute("data-lighting", "night");
  await page
    .getByRole("button", { name: "Set world to day", exact: true })
    .click();
  await expect
    .poll(
      () =>
        page
          .locator(".portfolio")
          .evaluate((element) =>
            Number(element.style.getPropertyValue("--night-mix")),
          ),
      { timeout: 10000 },
    )
    .toBeLessThan(0.02);
  await expect(page.locator(".hero")).toHaveAttribute("data-lighting", "day");
  await page
    .getByRole("button", { name: "Automatic day and night cycle", exact: true })
    .click();
  await expect(page.locator(".portfolio")).toHaveAttribute(
    "data-world-mode",
    "auto",
  );
});

test("pausing freezes the scenery and runner; resuming continues their motion", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute("data-renderer", "webgl");
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  const position = await page
    .locator(".hero-run-track")
    .evaluate((element) => getComputedStyle(element).transform);
  const pose = await page
    .locator(".byte-run-sprite")
    .evaluate((element) => getComputedStyle(element).backgroundPosition);
  const worldTime = await page
    .locator(".hero")
    .evaluate((element) => element.style.getPropertyValue("--world-time"));
  await page.waitForTimeout(350);
  await expect(page.locator(".hero-run-track")).toHaveCSS(
    "transform",
    position,
  );
  await expect(page.locator(".byte-run-sprite")).toHaveCSS(
    "background-position",
    pose,
  );
  expect(
    await page
      .locator(".hero")
      .evaluate((element) => element.style.getPropertyValue("--world-time")),
  ).toBe(worldTime);
  await page
    .getByRole("button", { name: "Resume animations", exact: true })
    .click();
  await expect
    .poll(() =>
      page
        .locator(".byte-run-sprite")
        .evaluate((element) => getComputedStyle(element).backgroundPosition),
    )
    .not.toBe(pose);
});

test("reduced motion keeps Byte still while manual lighting remains usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute("data-renderer", "webgl");
  await expect(page.locator(".hero-run-track")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".byte-run-sprite")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page
    .getByRole("button", { name: "Set world to night", exact: true })
    .click();
  await expect(page.locator(".hero")).toHaveAttribute("data-lighting", "night");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
