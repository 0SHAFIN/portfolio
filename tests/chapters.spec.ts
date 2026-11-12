import { expect, test } from "@playwright/test";

test("the finale has separate surface and underground artwork with pausable motion", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute("data-renderer", "webgl");
  const finale = page.locator(".finale-world");
  await expect(finale.locator("canvas")).toHaveCount(1);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(finale).toHaveAttribute("data-scene-active", "true");
  await expect(finale).toHaveAttribute("data-workshop-renderer", "webgl");
  await expect(finale.locator(".finale-surface-art img")).toHaveAttribute(
    "src", "/art/footer-workshop-surface.webp",
  );
  await expect(finale.locator(".finale-underground-art")).toHaveAttribute(
    "src", "/art/footer-underground.webp",
  );
  await expect(finale.locator(".finale-idle-sprite")).toHaveCSS(
    "animation-name", "workshop-idle",
  );
  const ground = await page.evaluate(() => ({
    surface: document.querySelector(".finale-above")!.getBoundingClientRect().bottom,
    underground: document.querySelector("footer")!.getBoundingClientRect().top,
    contactIsAboveGround: !!document.querySelector("#contact")!.closest(".finale-above"),
    footerIsBelowGround: document.querySelector("footer")!.classList.contains("finale-underground"),
  }));
  expect(Math.abs(ground.surface - ground.underground)).toBeLessThan(1);
  expect(ground.contactIsAboveGround).toBe(true);
  expect(ground.footerIsBelowGround).toBe(true);
  expect(
    await page.evaluate(
      () =>
        document.querySelector("#contact")!.closest(".finale-world") ===
        document.querySelector("footer")!.closest(".finale-world"),
    ),
  ).toBe(true);
  const heroLighting = await page
    .locator(".portfolio")
    .evaluate((element) => element.style.getPropertyValue("--night-mix"));
  const animationTime = () => finale.evaluate(
    (element) => Number(element.style.getPropertyValue("--workshop-time")),
  );
  const running = await animationTime();
  await expect.poll(animationTime).toBeGreaterThan(running);
  expect(
    await page
      .locator(".portfolio")
      .evaluate((element) => element.style.getPropertyValue("--night-mix")),
  ).toBe(heroLighting);
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  await page.waitForTimeout(150);
  const stopped = await animationTime();
  await page.waitForTimeout(350);
  expect(await animationTime()).toBe(stopped);
  await page
    .getByRole("button", { name: "Resume animations", exact: true })
    .click();
  await expect.poll(animationTime).toBeGreaterThan(stopped);
  await expect(
    finale.getByRole("link", { name: "Shafin on GitHub" }),
  ).toHaveAttribute("href", "https://github.com/0SHAFIN");
  await expect(
    finale.getByRole("link", { name: "The toolkit", exact: true }),
  ).toHaveAttribute("href", "#skills");
  await page.locator("#home").scrollIntoViewIfNeeded();
  await expect(finale).toHaveAttribute("data-scene-active", "false");
  const offscreen = await animationTime();
  await page.waitForTimeout(300);
  expect(await animationTime()).toBe(offscreen);
});

test("redesigned chapters preserve the real journey and fit narrow screens", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("#journey .journey-project")).toHaveCount(4);
  await expect(page.locator("#journey .journey-project").first()).toContainText(
    "American International University",
  );
  await expect(page.locator("#journey .current-stop")).toContainText("Upstal");
  await expect(page.locator("#journey .current-stop")).toContainText(
    "Rovalty",
  );
  await expect(page.locator("#skills").getByRole("tab")).toHaveCount(3);
  await expect(page.locator(".finale-idle-sprite")).toHaveCSS("animation-name", "none");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const clipped = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          ".chapter-heading h2,.finale-cta h2",
        ),
      )
        .filter((element) => element.scrollWidth > element.clientWidth + 1)
        .map((element) => element.textContent),
    );
    expect(clipped, `Headings must fit at ${width}px`).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
