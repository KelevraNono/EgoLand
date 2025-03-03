import type { Mock } from 'vitest';

import { createBase } from '@/testing/data-generators';
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils';
import { formatDate } from '@/utils/format';

import { default as BasesRoute } from '../bases';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as Mock).mockRestore();
});

test('should create, render and delete bases', { timeout: 10000 }, async () => {
  await renderApp(<BasesRoute />);

  const newBase = createBase();

  expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /Créer base/i }));

  const drawer = await screen.findByRole('dialog', {
    name: /Créer base/i,
  });

  const titleField = within(drawer).getByText(/title/i);
  const bodyField = within(drawer).getByText(/body/i);

  await userEvent.type(titleField, newBase.title);
  await userEvent.type(bodyField, newBase.body);

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  });

  await userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  const row = await screen.findByRole(
    'row',
    {
      name: `${newBase.title} ${formatDate(newBase.createdAt)} View Delete Base`,
    },
    { timeout: 5000 },
  );

  expect(
    within(row).getByRole('cell', {
      name: newBase.title,
    }),
  ).toBeInTheDocument();

  await userEvent.click(
    within(row).getByRole('button', {
      name: /delete base/i,
    }),
  );

  const confirmationDialog = await screen.findByRole('dialog', {
    name: /delete base/i,
  });

  const confirmationDeleteButton = within(confirmationDialog).getByRole(
    'button',
    {
      name: /delete base/i,
    },
  );

  await userEvent.click(confirmationDeleteButton);

  await screen.findByText(/base deleted/i);

  expect(
    within(row).queryByRole('cell', {
      name: newBase.title,
    }),
  ).not.toBeInTheDocument();
});
