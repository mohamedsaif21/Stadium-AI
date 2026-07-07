import { test, expect } from '@playwright/test';

test('fan flow works', async ({ page }) => {
  await page.goto('/login');
  await page.click('text=Fan');
  await page.waitForURL('/fan');
  await expect(page.locator('text=Fan Dashboard')).toBeVisible();
  await expect(page.locator('h3:has-text("AI Assistant")')).toBeVisible();
});

test('navigation search works', async ({ page }) => {
  await page.goto('/login');
  await page.click('text=Fan');
  await page.waitForURL('/fan');
  const searchInput = page.locator('input[aria-label="Search stadium locations"]');
  await searchInput.fill('Gate A');
  await page.click('button:has-text("Search")');
});

test('fan dashboard has emergency button', async ({ page }) => {
  await page.goto('/login');
  await page.click('text=Fan');
  await page.waitForURL('/fan');
  await expect(page.locator('text=Emergency Help')).toBeVisible();
});
