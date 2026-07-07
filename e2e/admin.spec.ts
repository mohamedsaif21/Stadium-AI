import { test, expect } from '@playwright/test';

test('admin dashboard loads', async ({ page }) => {
  await page.goto('/login');
  await page.click('text=Admin');
  await page.waitForURL('/admin');
  await expect(page.locator('text=Admin Operations Dashboard')).toBeVisible();
  await expect(page.locator('text=Stadium Zone Status')).toBeVisible();
});

test('admin can create alert', async ({ page }) => {
  await page.goto('/login');
  await page.click('text=Admin');
  await page.waitForURL('/admin');
  await page.click('text=Create Alert');
  await expect(page.locator('text=Create New Alert')).toBeVisible();
});
