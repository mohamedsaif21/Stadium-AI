import { test, expect } from '@playwright/test';

test('volunteer flow works', async ({ page }) => {
  await page.goto('/login');
  await page.click('text=Volunteer');
  await page.waitForURL('/volunteer');
  await expect(page.locator('text=Volunteer Dashboard')).toBeVisible();
  await expect(page.locator('text=SOP Quick Reference')).toBeVisible();
});

test('incident report form can be opened', async ({ page }) => {
  await page.goto('/login');
  await page.click('text=Volunteer');
  await page.waitForURL('/volunteer');
  await page.click('text=Report Incident');
  await expect(page.locator('text=Report New Incident')).toBeVisible();
});
