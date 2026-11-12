import { expect, test, type Page } from "@playwright/test";

async function ready(page: Page) {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("#journey")).toHaveAttribute("data-path-ready", "true");
}

async function focusAt(page: Page, progress: number) {
  await page.evaluate((p) => {
    const bounds = document.querySelector(".journey-focus")!.getBoundingClientRect();
    scrollTo({ top: scrollY + bounds.top - innerHeight * .55 - 40 + bounds.height * p, behavior: "instant" });
  }, progress);
}

test("university leads into Upstal and exactly three work products", async ({ page }) => {
  await ready(page);
  const rows = page.locator(".journey-project");
  await expect(rows).toHaveCount(4);
  await expect(rows.first()).toContainText("American International University");
  const job = page.getByRole("group", { name: "Upstal", exact: true });
  await expect(job.locator(".journey-project")).toHaveCount(3);
  await expect(job.locator(".journey-project h4")).toHaveText(["Rovalty", "Leadstal", "10xProfit"]);
  await expect(page.locator(".project-image-button")).toHaveCount(2);
  for (const name of ["Hattim", "MJ Properties"]) {
    await expect(page.getByRole("button", { name: `View ${name} project`, exact: true })).toBeAttached();
  }
  await expect(page.locator("#journey")).not.toContainText(/popsurge|testotrack|velopage|hattim|mj properties/i);
  await expect(rows.nth(1)).toContainText("Upstal · Currently working on");
  await expect(rows.nth(1).getByRole("link")).toHaveAttribute("href", "https://rovalty.com/");
  const art = await page.locator(".journey-art-window img").evaluateAll((elements) => elements.map((e) => new URL((e as HTMLImageElement).src).pathname));
  const work = await page.locator(".project-image-button .project-art").evaluateAll((elements) => elements.map((e) => new URL(getComputedStyle(e).backgroundImage.match(/url\(["']?(.*?)["']?\)/)![1], location.href).pathname));
  expect(new Set([...art, ...work]).size).toBe(6);
  for (const row of await rows.all()) {
    await row.scrollIntoViewIfNeeded();
    await expect.poll(() => row.locator("img").evaluate((e) => (e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  if (page.viewportSize()!.width > 700) {
    const order = await rows.evaluateAll((es) => es.map((e) => e.querySelector(".journey-project-copy")!.getBoundingClientRect().left < e.querySelector(".journey-project-art")!.getBoundingClientRect().left));
    expect(order).toEqual([true, false, true, false]);
  }
});

test("Byte follows the winding path, reverses, ends centrally and pauses", async ({ page }) => {
  await ready(page);
  const root = page.locator("#journey");

  for (const i of [0, 1, 2, 3]) {
    await page.locator(".journey-project").nth(i).evaluate((e) => scrollTo({ top: scrollY + e.getBoundingClientRect().top - innerHeight * .55 + 100, behavior: "instant" }));
    await expect.poll(() => page.locator(".journey-runner").evaluate((e) => Math.abs(e.getBoundingClientRect().top + e.clientHeight * .96 - innerHeight * .55))).toBeLessThan(1);
    const result = await page.locator(".journey-runner").evaluate((e) => {
      const path = document.querySelector<SVGPathElement>(".journey-snake-base")!;
      const progress = Number((document.querySelector("#journey") as HTMLElement).style.getPropertyValue("--journey-progress"));
      const point = path.getPointAtLength(path.getTotalLength() * progress);
      return { x: (e as HTMLElement).offsetLeft, error: Math.hypot(parseFloat((e as HTMLElement).style.left) - point.x, parseFloat((e as HTMLElement).style.top) - point.y) };
    });
    expect(result.error).toBeLessThan(1);

  }

  await page.locator(".journey-project").first().scrollIntoViewIfNeeded();
  await expect.poll(() => root.evaluate(e => Number(e.style.getPropertyValue("--journey-progress")))).toBeLessThan(.3);
  await expect(root).toHaveAttribute("data-running", "false");
  await page.getByRole("button", { name: "Pause animations", exact: true }).click();
  const frozen = await root.evaluate(e => e.style.getPropertyValue("--journey-progress"));
  await page.locator(".journey-project").nth(3).scrollIntoViewIfNeeded();
  await page.waitForTimeout(180);
  expect(await root.evaluate(e => e.style.getPropertyValue("--journey-progress"))).toBe(frozen);
  await page.getByRole("button", { name: "Resume animations", exact: true }).click();
  await expect.poll(() => root.evaluate(e => e.style.getPropertyValue("--journey-progress"))).not.toBe(frozen);
  const end = await page.locator(".journey-snake-base").evaluate(e => { const p = e as SVGPathElement; const last = p.getPointAtLength(p.getTotalLength()); return { x: last.x, y: last.y, width: p.parentElement!.getBoundingClientRect().width, height: p.parentElement!.getBoundingClientRect().height }; });
  expect(end.x).toBeCloseTo(end.width / 2, 0);
  expect(end.y).toBeCloseTo(end.height - 40, 0);
});

test("the finale grows, changes expression and flies into the next section", async ({ page }) => {
  await ready(page);
  const root = page.locator("#journey");
  const flight = page.locator(".journey-flight");
  await focusAt(page, .12);
  await expect(root).toHaveAttribute("data-phase", "arriving");
  await expect(flight).toHaveAttribute("data-visible", "true");
  for (const [progress, expression] of [[.28, "curious"], [.45, "happy"], [.62, "wink"]] as const) {
    await focusAt(page, progress);
    await expect(flight).toHaveAttribute("data-expression", expression);
    await expect(root).toHaveAttribute("data-phase", "expression");
    const size = await page.locator(".journey-flight-character").evaluate(e => ({ actual: e.clientHeight, expected: Math.min(innerHeight * .79, innerWidth * .92), left: e.getBoundingClientRect().left, right: e.getBoundingClientRect().right, viewport: innerWidth }));
    expect(Math.abs(size.actual - size.expected)).toBeLessThan(1);
    expect(size.left).toBeGreaterThanOrEqual(0);
    expect(size.right).toBeLessThanOrEqual(size.viewport);
    await expect(flight.locator(`.byte-expression-${expression}`)).toHaveCSS("display", "block");
  }
  await page.getByRole("button", { name: "Pause animations", exact: true }).click();
  await focusAt(page, .45);
  await page.waitForTimeout(150);
  await expect(flight).toHaveAttribute("data-expression", "wink");
  await page.getByRole("button", { name: "Resume animations", exact: true }).click();
  await expect(flight).toHaveAttribute("data-expression", "happy");
  await focusAt(page, .92);
  await expect(root).toHaveAttribute("data-phase", "departing");
  expect(await page.locator(".journey-flight-character").evaluate(e => e.clientHeight / innerHeight)).toBeLessThan(.3);
  await focusAt(page, 1.01);
  await expect(flight).toHaveAttribute("data-visible", "false");
  await expect(page.locator("#projects")).toBeInViewport();
  await focusAt(page, .62);
  await expect(flight).toHaveAttribute("data-expression", "wink");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(flight).toHaveCSS("display", "none");
  await expect(page.locator(".journey-runner")).toHaveCSS("display", "none");
  await expect(page.locator(".journey-focus-sticky")).toHaveCSS("position", "relative");
});

test("Byte disappears behind an illustration and reappears below it", async ({ page }) => {
  await ready(page);
  // Sample the same on-screen region with and without the runner. The opaque
  // artwork must fully occlude him in the middle, but not after he emerges.
  const art = page.locator("#journey-project-3 .journey-project-art");
  const runner = page.locator(".journey-runner");
  for (const hidden of [true, false]) {
    await art.evaluate((e, inside) => {
      const b = e.getBoundingClientRect();
      const y = inside ? b.top + b.height * .6 : b.bottom + 125;
      scrollTo({ top: scrollY + y - innerHeight * .55, behavior: "instant" });
    }, hidden);
    await expect(page.locator("#journey")).toHaveAttribute("data-running", "false");
    await page.waitForTimeout(180);
    await page.getByRole("button", { name: "Pause animations", exact: true }).click();
    const bounds = await runner.boundingBox();
    const clip = { x: Math.max(0, Math.floor(bounds!.x) - 10), y: Math.floor(bounds!.y) - 10, width: Math.ceil(bounds!.width) + 20, height: Math.ceil(bounds!.height) + 20 };
    const visible = await page.screenshot({ clip });
    await runner.evaluate(e => e.style.opacity = "0");
    const absent = await page.screenshot({ clip });
    expect(visible.equals(absent), hidden ? "Illustration occludes Byte" : "Byte emerges beyond the illustration").toBe(hidden);
    await runner.evaluate(e => e.style.removeProperty("opacity"));
    await page.getByRole("button", { name: "Resume animations", exact: true }).click();
  }
});

test("journey content and its path fit narrow and wide viewports", async ({ page }) => {
  await ready(page);
  for (const width of [320, 390, 700, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator("#journey-project-4").scrollIntoViewIfNeeded();
    const overflow = await page.locator(".journey-project-copy, .journey-project h3, .journey-project h4, .journey-heading h2").evaluateAll(es => es.filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent));
    expect(overflow, `Content fits ${width}px`).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
