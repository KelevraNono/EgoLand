import type { Mock } from 'vitest';

import { default as DonationsRoute } from '../donations';

import { createDonation } from '@/testing/data-generators';
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils';
import { formatDate } from '@/utils/format';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as Mock).mockRestore();
});

test(
  'should create, render and delete donations',
  { timeout: 10000 },
  async () => {
    await renderApp(<DonationsRoute />);

    const newDonation = createDonation();

    expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /Créer donation/i }),
    );

    const drawer = await screen.findByRole('dialog', {
      name: /Créer donation/i,
    });

    const titleField = within(drawer).getByText(/title/i);
    const bodyField = within(drawer).getByText(/body/i);

    await userEvent.type(titleField, newDonation.title);
    await userEvent.type(bodyField, newDonation.body);

    const submitButton = within(drawer).getByRole('button', {
      name: /submit/i,
    });

    await userEvent.click(submitButton);

    await waitFor(() => expect(drawer).not.toBeInTheDocument());

    const row = await screen.findByRole(
      'row',
      {
        name: `${newDonation.title} ${formatDate(newDonation.createdAt)} View Delete Donation`,
      },
      { timeout: 5000 },
    );

    expect(
      within(row).getByRole('cell', {
        name: newDonation.title,
      }),
    ).toBeInTheDocument();

    await userEvent.click(
      within(row).getByRole('button', {
        name: /delete donation/i,
      }),
    );

    const confirmationDialog = await screen.findByRole('dialog', {
      name: /delete donation/i,
    });

    const confirmationDeleteButton = within(confirmationDialog).getByRole(
      'button',
      {
        name: /delete donation/i,
      },
    );

    await userEvent.click(confirmationDeleteButton);

    await screen.findByText(/donation deleted/i);

    expect(
      within(row).queryByRole('cell', {
        name: newDonation.title,
      }),
    ).not.toBeInTheDocument();
  },
);
