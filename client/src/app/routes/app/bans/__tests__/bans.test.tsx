import type { Mock } from 'vitest';

import { createBan } from '@/testing/data-generators';
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils';
import { formatDate } from '@/utils/format';

import { default as BansRoute } from '../bans';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as Mock).mockRestore();
});

test('should create, render and delete bans', { timeout: 10000 }, async () => {
  await renderApp(<BansRoute />);

  const newBan = createBan();

  expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /Créer ban/i }));

  const drawer = await screen.findByRole('dialog', {
    name: /Créer ban/i,
  });

  const titleField = within(drawer).getByText(/title/i);
  const bodyField = within(drawer).getByText(/body/i);

  await userEvent.type(titleField, newBan.title);
  await userEvent.type(bodyField, newBan.body);

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  });

  await userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  const row = await screen.findByRole(
    'row',
    {
      name: `${newBan.title} ${formatDate(newBan.createdAt)} View Delete Ban`,
    },
    { timeout: 5000 },
  );

  expect(
    within(row).getByRole('cell', {
      name: newBan.title,
    }),
  ).toBeInTheDocument();

  await userEvent.click(
    within(row).getByRole('button', {
      name: /delete ban/i,
    }),
  );

  const confirmationDialog = await screen.findByRole('dialog', {
    name: /delete ban/i,
  });

  const confirmationDeleteButton = within(confirmationDialog).getByRole(
    'button',
    {
      name: /delete ban/i,
    },
  );

  await userEvent.click(confirmationDeleteButton);

  await screen.findByText(/ban deleted/i);

  expect(
    within(row).queryByRole('cell', {
      name: newBan.title,
    }),
  ).not.toBeInTheDocument();
});
