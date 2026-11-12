import { expect, test } from "@playwright/test";

for (const lighting of ["day", "night"] as const) {
  test(`${lighting}: terrain stays still while trees and the campfire animate`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1536, height: 1024 });
    await page.goto("/");
    await expect(page.locator(".hero")).toHaveAttribute(
      "data-renderer",
      "webgl",
    );
    await page
      .getByRole("button", { name: `Set world to ${lighting}`, exact: true })
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
      .toBe(lighting === "night" ? 1 : 0);
    await expect(page.locator(".hero .world-canvas")).toHaveCSS("opacity", "1");
    // Isolate the scenery from the moving character, text, clouds, and leaf particles.
    await page.addStyleTag({
      content: ".header,.hero>:not(.landscape){visibility:hidden!important}",
    });
    const mountain = { x: 1010, y: 380, width: 170, height: 100 };
    const cliff = { x: 170, y: 227, width: 45, height: 100 };
    const tree = { x: 1260, y: 481, width: 85, height: 145 };
    const fire = { x: 1369, y: 674, width: 50, height: 65 };
    const mountainBefore = await page.screenshot({ clip: mountain });
    const cliffBefore = await page.screenshot({ clip: cliff });
    const treeBefore = await page.screenshot({ clip: tree });
    const fireBefore = await page.screenshot({ clip: fire });
    await page.waitForTimeout(650);
    expect(
      (await page.screenshot({ clip: mountain })).equals(mountainBefore),
      "Mountain pixels must stay unchanged",
    ).toBe(true);
    expect(
      (await page.screenshot({ clip: cliff })).equals(cliffBefore),
      "Cliff pixels must stay unchanged",
    ).toBe(true);
    expect(
      (await page.screenshot({ clip: tree })).equals(treeBefore),
      "Tree needles must move",
    ).toBe(false);
    expect(
      (await page.screenshot({ clip: fire })).equals(fireBefore),
      "Flames and embers must change",
    ).toBe(false);
  });
}

test("the hero ends at a solid unbroken bar after scrolling", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute("data-renderer", "webgl");
  await page.evaluate(() =>
    window.scrollTo({
      top:
        document.querySelector<HTMLElement>(".hero")!.offsetHeight -
        innerHeight * 0.4,
      behavior: "instant",
    }),
  );
  await expect(page.locator(".hero")).toHaveCSS("overflow", "hidden");
  await expect(page.locator(".landscape")).toHaveCSS("transform", "none");
  await expect(page.locator(".pixel-edge")).toHaveCSS("clip-path", "none");
  await expect(page.locator(".world-bar")).toHaveCSS(
    "background-color",
    "rgb(23, 62, 53)",
  );
  const boundaries = await page.evaluate(() => ({
    hero: document.querySelector(".hero")!.getBoundingClientRect().bottom,
    bar: document.querySelector(".world-bar")!.getBoundingClientRect().top,
    overflow: document.documentElement.scrollWidth > innerWidth,
  }));
  expect(Math.abs(boundaries.hero - boundaries.bar)).toBeLessThan(1);
  expect(boundaries.overflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("hero-boundary.png") });
});
