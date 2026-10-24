import { test, expect } from '@playwright/test';

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });
  test.beforeEach(async ({ page }) => { await page.goto('/'); });

  test('hamburger is visible and desktop navigation is hidden', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible();
    await expect(page.locator('.nav')).not.toBeVisible();
  });

  test('drawer fills the viewport and exposes grouped seller links', async ({ page }) => {
    await page.getByRole('button', { name: 'Open navigation' }).click();
    const drawer = page.getByRole('dialog', { name: 'Navigation', exact: true });
    await expect(drawer).toBeVisible();
    const box = await drawer.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(800);
    await expect(drawer.getByRole('link', { name: 'Home', exact: true })).toBeVisible();
    await drawer.locator('summary').filter({ hasText: 'Sell your house' }).click();
    await expect(drawer.getByRole('link', { name: 'Foreclosure', exact: true })).toBeVisible();
  });

  test('a destination link closes the drawer and navigates', async ({ page }) => {
    await page.getByRole('button', { name: 'Open navigation' }).click();
    const drawer = page.getByRole('dialog', { name: 'Navigation', exact: true });
    await drawer.getByRole('link', { name: 'FAQ', exact: true }).click();
    await expect(drawer).not.toBeVisible();
    await expect(page).toHaveURL(/\/faq$/);
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  });

  test('keyboard focus stays inside the modal and Escape returns it', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Open navigation' });
    await toggle.click();
    const drawer = page.getByRole('dialog', { name: 'Navigation', exact: true });
    await expect(drawer.getByRole('button', { name: 'Close navigation' })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(drawer.getByRole('link', { name: 'Call (561) 220-9399' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(drawer.getByRole('button', { name: 'Close navigation' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
    await expect(toggle).toBeFocused();
  });

  test('resizing to desktop closes the modal and restores scrolling', async ({ page }) => {
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.getByRole('dialog', { name: 'Navigation', exact: true })).not.toBeVisible();
    await expect(page.locator('.nav')).toBeVisible();
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  });
});

test('desktop navigation is visible without hamburger', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Open navigation' })).not.toBeVisible();
  await expect(page.locator('.nav')).toBeVisible();
});
