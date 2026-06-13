import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'mobile-375',   width: 375,  height: 812 },
];

for (const vp of VIEWPORTS) {
  test(`[${vp.name}] CTA "Get My Cash Offer" scrolls to and focuses the address input`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');

    // Find the CTA in the SocialProofSection (below the hero) and click it.
    // ScrollToFormLink renders as an <a href="#lead-form">.
    const cta = page.locator('a[href="#lead-form"]').first();
    await expect(cta).toBeVisible();
    await cta.click();

    // After click + focus timeout (400ms), the address input should be focused.
    await page.waitForTimeout(500);
    const addressInput = page.locator('#lead-form input[name="address"]');
    await expect(addressInput).toBeFocused();

    // The form should be in the viewport.
    const formBox = await page.locator('#lead-form').boundingBox();
    expect(formBox).toBeTruthy();
    const viewportHeight = page.viewportSize()!.height;
    // At least the top of the form is at or below zero (scrolled into view).
    expect(formBox!.y).toBeLessThan(viewportHeight);
  });
}
