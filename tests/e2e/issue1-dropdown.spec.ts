import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile-320',  width: 320,  height: 812 },
  { name: 'mobile-375',  width: 375,  height: 812 },
  { name: 'tablet-768',  width: 768,  height: 1024 },
  { name: 'desktop-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

// Dropdown only visible on wider screens; test at 1024 and 1440.
for (const vp of VIEWPORTS.filter(v => v.width >= 1024)) {
  test(`[${vp.name}] dropdown: hover trigger → move into panel → click item`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');

    const trigger = page.getByRole('link', { name: /We Buy Houses/i }).first();
    await trigger.hover();

    // Panel should be visible
    const panel = page.locator('.dropdown-panel');
    await expect(panel).toBeVisible();

    // Move into panel and click first item
    const firstLink = panel.getByRole('menuitem').first();
    await firstLink.hover();
    await expect(panel).toBeVisible({ timeout: 500 });
    await firstLink.click();

    // Navigation happened (URL changed)
    await expect(page).not.toHaveURL('/');
  });

  test(`[${vp.name}] dropdown: keyboard Tab/Enter/Esc`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');

    const trigger = page.getByRole('link', { name: /We Buy Houses/i }).first();

    // Focus the trigger
    await trigger.focus();
    await expect(page.locator('.dropdown-panel')).toBeVisible();

    // Tab into the panel items
    await page.keyboard.press('Tab');
    const firstItem = page.locator('.dropdown-link').first();
    await expect(firstItem).toBeFocused();

    // Esc closes it — focus goes back to trigger
    await page.keyboard.press('Escape');
    await expect(page.locator('.dropdown-panel')).not.toBeVisible();

    // Re-open and Enter on an item navigates
    await trigger.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).not.toHaveURL('/');
  });
}
