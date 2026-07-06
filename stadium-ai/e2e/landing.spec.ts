import { test, expect } from '@playwright/test';

test('user can open landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=StadiumAI').first()).toBeVisible();
  await expect(page.locator('text=Fan Demo').first()).toBeVisible();
  await expect(page.locator('text=Volunteer Demo').first()).toBeVisible();
});

test('landing page has feature cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=AI Fan Assistant')).toBeVisible();
  await expect(page.locator('text=Crowd Intelligence')).toBeVisible();
});

test('navigation to login page works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Login');
  await expect(page).toHaveURL('/login');
});

test('fan demo redirects to login', async ({ page }) => {
  await page.goto('/');
  await page.locator('text=Fan Demo').first().click();
  await expect(page).toHaveURL('/login');
});
