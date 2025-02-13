import { test as setup, expect } from '@playwright/test';
import { createUser } from '../../src/testing/data-generators';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const user = createUser();

  await page.goto('/');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/auth/login');
  await page.getByRole('link', { name: "S'enregistrer" }).click();

  // s'enregistrer:
  await page.getByLabel('Prénom').click();
  await page.getByLabel('Prénom').fill(user.firstName);
  await page.getByLabel('Nom').click();
  await page.getByLabel('Nom').fill(user.lastName);
  await page.getByLabel('Adresse e-mail').click();
  await page.getByLabel('Adresse e-mail').fill(user.email);
  await page.getByLabel('Mot de passe').click();
  await page.getByLabel('Mot de passe').fill(user.password);
  await page.getByLabel("Nom de l'équipe").click();
  await page.getByLabel("Nom de l'équipe").fill(user.teamName);
  await page.getByRole('button', { name: "S'enregistrer" }).click();
  await page.waitForURL('/app');

  // se deconnecter:
  await page.getByRole('button', { name: 'Ouvrir menu utilisateur' }).click();
  await page.getByRole('menuitem', { name: 'Se déconnecter' }).click();
  await page.waitForURL('/auth/login?redirectTo=%2Fapp');

  // se connecter:
  await page.getByLabel('Adresse e-mail').click();
  await page.getByLabel('Adresse e-mail').fill(user.email);
  await page.getByLabel('Mot de passe').click();
  await page.getByLabel('Mot de passe').fill(user.password);
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/app');

  await page.context().storageState({ path: authFile });
});
