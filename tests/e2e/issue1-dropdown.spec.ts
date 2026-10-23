import { test, expect } from '@playwright/test';

for (const width of [1024, 1440]) {
  test(`[desktop-${width}] seller dropdown supports hover and navigation`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Sell your house', exact: true });
    await trigger.hover();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const link = page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'How we buy houses' });
    await link.hover();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/we-buy-houses$/);
  });

  test(`[desktop-${width}] dropdown supports keyboard opening, Escape and navigation`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Sell your house', exact: true });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    const firstLink = page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'How we buy houses' });
    await expect(firstLink).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/we-buy-houses$/);
  });
}

test('service-area dropdown navigates to the selected county', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Areas we serve', exact: true });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Broward County', exact: true }).click();
  await expect(page).toHaveURL(/\/broward-county$/);
});
