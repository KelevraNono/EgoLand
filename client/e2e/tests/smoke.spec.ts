import { test, expect } from '@playwright/test';

import {
  createDiscussion,
  createComment,
} from '../../src/testing/data-generators';
test('smoke', async ({ page }) => {
  const discussion = createDiscussion();
  const comment = createComment();

  await page.goto('/');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/app');

  // Créer discussion:
  await page.getByRole('link', { name: 'Discussions' }).click();
  await page.waitForURL('/app/discussions');

  await page.getByRole('button', { name: 'Créer discussion' }).click();
  await page.getByLabel('Titre').click();
  await page.getByLabel('Titre').fill(discussion.title);
  await page.getByLabel('Contenu').click();
  await page.getByLabel('Contenu').fill(discussion.body);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page
    .getByLabel('Discussion créée')
    .getByRole('button', { name: 'Fermer' })
    .click();

  // visit discussion page:
  await page.getByRole('link', { name: 'Voir' }).click();

  await expect(
    page.getByRole('heading', { name: discussion.title }),
  ).toBeVisible();
  await expect(page.getByText(discussion.body)).toBeVisible();

  // update discussion:
  await page.getByRole('button', { name: 'Éditer la discussion' }).click();
  await page.getByLabel('Titre').click();
  await page.getByLabel('Titre').fill(`${discussion.title} - éditée`);
  await page.getByLabel('Contenu').click();
  await page.getByLabel('Contenu').fill(`${discussion.body} - éditée`);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page
    .getByLabel('Discussion éditée')
    .getByRole('button', { name: 'Fermer' })
    .click();

  await expect(
    page.getByRole('heading', { name: `${discussion.title} - éditée` }),
  ).toBeVisible();
  await expect(page.getByText(`${discussion.body} - éditée`)).toBeVisible();

  // créer un commentaire:
  await page.getByRole('button', { name: 'Créer un commentaire' }).click();
  await page.getByLabel('Contenu').click();
  await page.getByLabel('Contenu').fill(comment.body);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText(comment.body)).toBeVisible();
  await page
    .getByLabel('Commentaire créé')
    .getByRole('button', { name: 'Fermer' })
    .click();

  // delete comment:
  await page.getByRole('button', { name: 'Supprimer commentaire' }).click();
  await expect(
    page.getByText('Are you sure you want to delete this comment?'),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Supprimer commentaire' }).click();
  await page
    .getByLabel('Comment Deleted')
    .getByRole('button', { name: 'Fermer' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Pas de données' }),
  ).toBeVisible();
  await expect(page.getByText(comment.body)).toBeHidden();

  // retour aux discussions:
  await page.getByRole('link', { name: 'Discussions' }).click();
  await page.waitForURL('/app/discussions');

  // supprimer discussion:
  await page.getByRole('button', { name: 'Supprimer iscussion' }).click();
  await page.getByRole('button', { name: 'Supprimer iscussion' }).click();
  await page
    .getByLabel('Discussion supprimée')
    .getByRole('button', { name: 'Fermer' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Pas de données' }),
  ).toBeVisible();
});
