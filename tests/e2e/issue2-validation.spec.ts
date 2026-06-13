import { test, expect } from '@playwright/test';

test.describe('Form validation', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the lead API so form submission doesn't actually navigate away.
    await page.route('/api/lead', (route) => route.fulfill({ status: 200, body: 'ok' }));
    await page.goto('/');
    // Scroll to the form so fields are interactable.
    await page.locator('.lead-form').scrollIntoViewIfNeeded();
  });

  // ── Phone ─────────────────────────────────────────────────────────────────

  for (const bad of ['123', '12345678']) {
    test(`phone reject: "${bad}"`, async ({ page }) => {
      const phoneInput = page.locator('input[name="phone"]');
      await phoneInput.fill(bad);
      await phoneInput.blur();
      await expect(page.locator('#phone-error')).toBeVisible();
    });
  }

  test('phone accept: "(561) 220-9399"', async ({ page }) => {
    const phoneInput = page.locator('input[name="phone"]');
    await phoneInput.fill('(561) 220-9399');
    await phoneInput.blur();
    await expect(page.locator('#phone-error')).not.toBeVisible();
  });

  // ── Email ─────────────────────────────────────────────────────────────────

  for (const bad of ['abc', 'abc@', 'abc@x', 'a b@x.com']) {
    test(`email reject: "${bad}"`, async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      await emailInput.fill(bad);
      await emailInput.blur();
      await expect(page.locator('#email-error')).toBeVisible();
    });
  }

  test('email accept: "user@example.com"', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('user@example.com');
    await emailInput.blur();
    await expect(page.locator('#email-error')).not.toBeVisible();
  });

  // ── Submit blocked ────────────────────────────────────────────────────────

  test('submit blocked when phone invalid', async ({ page }) => {
    const phoneInput = page.locator('input[name="phone"]');
    await phoneInput.fill('123');

    const currentUrl = page.url();
    await page.locator('.lead-form button[type="submit"]').click();

    // Should still be on the same page
    await expect(page).toHaveURL(currentUrl);
    await expect(page.locator('#phone-error')).toBeVisible();
  });

  test('submit blocked when email invalid', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('abc@x');

    const currentUrl = page.url();
    await page.locator('.lead-form button[type="submit"]').click();

    await expect(page).toHaveURL(currentUrl);
    await expect(page.locator('#email-error')).toBeVisible();
  });
});
