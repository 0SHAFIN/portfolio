import { expect, test } from "@playwright/test";

test("character messages loop one at a time with varied positions and animations", async ({
  page,
}) => {
  await page.goto("/");
  const character = page.getByRole("button", {
    name: "Say hello to Byte the explorer",
  });
  const bubble = page.locator(".explorer-bubble");
  await expect(bubble).toHaveCount(0);
  const messages = new Set<string>();
  const positions = new Set<string>();
  const animations = new Set<string>();
  let firstPosition = "";
  for (let index = 0; index < 8; index++) {
    await character.click();
    await expect(bubble).toHaveCount(1);
    if (index === 0) await expect(bubble).toHaveText("Hello, world!");
    if (index === 1) await expect(bubble).toHaveText("Hey! I’m Byte.");
    messages.add((await bubble.textContent())!.trim());
    const slot = page.locator(".explorer-bubble-slot");
    const position = (await slot.getAttribute("data-position"))!;
    if (index === 0) firstPosition = position;
    positions.add(position);
    animations.add(
      await bubble.evaluate(
        (element) => getComputedStyle(element).animationName,
      ),
    );
    const bounds = (await slot.boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(
      await page.evaluate(() => innerWidth),
    );
  }
  expect(messages.size).toBe(8);
  expect(positions.size).toBe(5);
  expect(animations.size).toBe(5);
  expect(animations.has("none")).toBe(false);
  await character.click();
  await expect(bubble).toHaveCount(1);
  await expect(bubble).toHaveText("Hello, world!");
  await expect(page.locator(".explorer-bubble-slot")).not.toHaveAttribute(
    "data-position",
    firstPosition,
  );
});

test("new clicks replace the message and restart its dismissal timer", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const character = page.getByRole("button", {
    name: "Say hello to Byte the explorer",
  });
  const bubble = page.locator(".explorer-bubble");
  await character.click();
  await expect(bubble).toHaveText("Hello, world!");
  await page.waitForTimeout(1700);
  await character.click();
  await character.click();
  await expect(bubble).toHaveCount(1);
  await expect(bubble).toHaveText("Tiny pixels. Big ideas.");
  await expect(bubble).toBeVisible();
  // The first popup's old timer must not dismiss this newer message.
  await page.waitForTimeout(1400);
  await expect(bubble).toHaveText("Tiny pixels. Big ideas.");
  await expect(bubble).toHaveCount(0, { timeout: 2500 });
  await character.press("Enter");
  await expect(bubble).toHaveText("One step. One commit.");
});
