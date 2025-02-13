import { test, expect } from '@playwright/test';

test('profile', async ({ page }) => {
  // update user:
  await page.goto('/app');
  await page.getByRole('button', { name: 'Ouvrir menu utilisateur' }).click();
  await page.getByRole('menuitem', { name: 'Votre profil' }).click();
  await page.getByRole('button', { name: 'Éditer le profil' }).click();
  await page.getByLabel('Bio').click();
  await page.getByLabel('Bio').fill('Ma bio');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page
    .getByLabel('Profil édité')
    .getByRole('button', { name: 'Fermer' })
    .click();
  await expect(page.getByText('Ma bio')).toBeVisible();
});
