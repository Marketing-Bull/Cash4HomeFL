import { test, expect } from '@playwright/test';

test.describe('Mobile nav hamburger (375px)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hamburger button is visible; desktop nav is hidden', async ({ page }) => {
    await expect(page.locator('.mobile-nav-btn')).toBeVisible();
    await expect(page.locator('.nav')).not.toBeVisible();
  });

  test('tapping hamburger opens the drawer with all links', async ({ page }) => {
    await page.locator('.mobile-nav-btn').click();
    const drawer = page.locator('.mobile-nav-drawer');
    await expect(drawer).toBeVisible();
    // All primary links present
    await expect(drawer.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'FAQ' })).toBeVisible();
    // Situation links present
    await expect(drawer.getByRole('link', { name: 'Foreclosure' })).toBeVisible();
  });

  test('tapping a link closes the drawer', async ({ page }) => {
    await page.locator('.mobile-nav-btn').click();
    await expect(page.locator('.mobile-nav-drawer')).toBeVisible();
    await page.locator('.mobile-nav-drawer').getByRole('link', { name: 'FAQ' }).click();
    await expect(page.locator('.mobile-nav-drawer')).not.toBeVisible();
  });

  test('Esc closes the drawer', async ({ page }) => {
    await page.locator('.mobile-nav-btn').click();
    await expect(page.locator('.mobile-nav-drawer')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.mobile-nav-drawer')).not.toBeVisible();
  });
});

test.describe('Mobile nav absent on desktop (1440px)', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('hamburger hidden; desktop nav visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.mobile-nav-btn')).not.toBeVisible();
    await expect(page.locator('.nav')).toBeVisible();
  });
});
