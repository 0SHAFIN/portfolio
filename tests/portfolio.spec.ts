import { test, expect } from "@playwright/test";

test("the real portfolio content loads without runtime errors or overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Big ideas.",
  );
  await expect(
    page.getByRole("link", { name: "Meet me on GitHub" }),
  ).toHaveAttribute("href", "https://github.com/0SHAFIN");
  await expect(
    page.getByRole("link", { name: "A little more about me" }),
  ).toHaveAttribute("href", "/documents/shafin-resume.pdf");
  await expect(page.locator(".landscape img")).toBeVisible();
  await expect(page.locator(".landscape img")).toHaveJSProperty(
    "complete",
    true,
  );
  await expect
    .poll(() =>
      page
        .locator(".landscape img")
        .evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("projects filter correctly and detail dialogs open and close accessibly", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  const filters = page.getByRole("group", { name: "Filter projects" });
  await expect(filters.getByRole("button", { name: "Frontend", exact: true })).toHaveCount(0);
  await filters.getByRole("button", { name: "Full-stack", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(page.locator("#projects")).not.toContainText("Velopage");
  await page.getByRole("button", { name: "View Hattim project" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Hattim",
  );
  await expect(
    page.getByRole("link", { name: "Explore live project" }),
  ).toHaveAttribute("href", "https://hattimbd.com/");
  await page.getByRole("button", { name: "Close project" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "View Hattim project" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await filters
    .getByRole("button", { name: "Full-stack", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await filters.getByRole("button", { name: "All projects" }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
});

test("contact details can be copied and the resume is downloadable", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Email copied!" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "shafin3024344@gmail.com",
  );
  const resume = await page.request.get("/documents/shafin-resume.pdf");
  expect(resume.ok()).toBe(true);
  expect(resume.headers()["content-type"]).toContain("application/pdf");
});

test("skill tabs support keyboard navigation and display the right tools", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  await page.getByRole("tab", { name: "Backend" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("PostgreSQL");
  await expect(page.getByRole("tabpanel")).not.toContainText("Framer Motion");
  await page.getByRole("tab", { name: "Backend" }).press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Tools" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel")).toContainText("Postman");
  await page.getByRole("tab", { name: "Tools" }).press("Home");
  await expect(page.getByRole("tab", { name: "Frontend" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("the explorer, collectible gems, sound and pause controls work", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Say hello to Byte the explorer" })
    .click();
  await expect(page.locator(".explorer-bubble")).toHaveClass(/is-visible/);
  for (let i = 1; i <= 3; i++)
    await page.getByRole("button", { name: `Collect hidden gem ${i}` }).click();
  await expect(page.locator(".gem-counter")).toContainText("3/3");
  await expect(page.locator(".explorer-bubble")).toContainText(
    "All gems found",
  );
  await page.getByRole("button", { name: "Enable ambient sound" }).click();
  await expect(
    page.getByRole("button", { name: "Mute ambient sound" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Mute ambient sound" }).click();
  await expect(
    page.getByRole("button", { name: "Enable ambient sound" }),
  ).toHaveAttribute("aria-pressed", "false");
  await page
    .getByRole("button", { name: "Resume animations", exact: true })
    .click();
  await expect(page.locator(".portfolio")).not.toHaveClass(/is-paused/);
});

test("system reduced motion leaves content visible and stops continuous motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#about h2")).toHaveCSS("opacity", "1");
  await expect(page.locator(".ticker-track")).toHaveCSS(
    "animation-name",
    "none",
  );
});

test("navigation reaches the requested section on all screen sizes", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile)
    await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "The toolkit" })
    .click();
  await expect(page).toHaveURL(/#skills$/);
  if (isMobile)
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
});
