import type { Mock } from 'vitest';

import { createWarning } from '@/testing/data-generators';
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils';
import { formatDate } from '@/utils/format';

import { default as WarningsRoute } from '../warnings';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as Mock).mockRestore();
});

test(
  'should create, render and delete warnings',
  { timeout: 10000 },
  async () => {
    await renderApp(<WarningsRoute />);

    const newWarning = createWarning();

    expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /Créer warning/i }),
    );

    const drawer = await screen.findByRole('dialog', {
      name: /Créer warning/i,
    });

    const titleField = within(drawer).getByText(/title/i);
    const bodyField = within(drawer).getByText(/body/i);

    await userEvent.type(titleField, newWarning.title);
    await userEvent.type(bodyField, newWarning.body);

    const submitButton = within(drawer).getByRole('button', {
      name: /submit/i,
    });

    await userEvent.click(submitButton);

    await waitFor(() => expect(drawer).not.toBeInTheDocument());

    const row = await screen.findByRole(
      'row',
      {
        name: `${newWarning.title} ${formatDate(newWarning.createdAt)} View Delete Warning`,
      },
      { timeout: 5000 },
    );

    expect(
      within(row).getByRole('cell', {
        name: newWarning.title,
      }),
    ).toBeInTheDocument();

    await userEvent.click(
      within(row).getByRole('button', {
        name: /delete warning/i,
      }),
    );

    const confirmationDialog = await screen.findByRole('dialog', {
      name: /delete warning/i,
    });

    const confirmationDeleteButton = within(confirmationDialog).getByRole(
      'button',
      {
        name: /delete warning/i,
      },
    );

    await userEvent.click(confirmationDeleteButton);

    await screen.findByText(/warning deleted/i);

    expect(
      within(row).queryByRole('cell', {
        name: newWarning.title,
      }),
    ).not.toBeInTheDocument();
  },
);
