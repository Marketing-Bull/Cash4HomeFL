import { test, expect } from '@playwright/test';

test.describe('Form submission', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.lead-form').scrollIntoViewIfNeeded();
  });

  test('happy path: valid fields redirect to /thank-you', async ({ page }) => {
    await page.route('/api/lead', (route) =>
      route.fulfill({ status: 303, headers: { location: '/thank-you' } }),
    );

    await page.locator('input[name="address"]').fill('123 Main St, West Palm Beach, FL');
    await page.locator('input[name="phone"]').fill('(561) 220-9399');
    await page.locator('input[name="email"]').fill('user@example.com');

    await page.locator('.lead-form button[type="submit"]').click();

    await expect(page).toHaveURL(/\/thank-you$/);
  });

  test('address is required: empty address blocks native submission', async ({ page }) => {
    const addressInput = page.locator('input[name="address"]');
    await addressInput.fill('');
    await page.locator('input[name="phone"]').fill('(561) 220-9399');
    await page.locator('input[name="email"]').fill('user@example.com');

    const currentUrl = page.url();
    await page.locator('.lead-form button[type="submit"]').click();

    // Native "required" validation blocks the submit — page doesn't navigate.
    await expect(page).toHaveURL(currentUrl);
    const isValid = await addressInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  });

  test('lead API failure does not silently hang the page', async ({ page }) => {
    await page.route('/api/lead', (route) =>
      route.fulfill({ status: 500, body: 'Internal Server Error' }),
    );

    await page.locator('input[name="address"]').fill('123 Main St, West Palm Beach, FL');
    await page.locator('input[name="phone"]').fill('(561) 220-9399');
    await page.locator('input[name="email"]').fill('user@example.com');

    await page.locator('.lead-form button[type="submit"]').click();

    // Native form POST navigates away from "/" even on a server error —
    // there is no in-page error banner (form has no client-side fetch/error UI).
    await expect(page).not.toHaveURL('/');
  });
});
