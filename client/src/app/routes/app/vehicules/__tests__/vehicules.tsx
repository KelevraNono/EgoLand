import type { Mock } from 'vitest';

import { createVehicule } from '@/testing/data-generators';
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils';
import { formatDate } from '@/utils/format';

import { default as VehiculesRoute } from '../vehicules';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as Mock).mockRestore();
});

test(
  'should create, render and delete vehicules',
  { timeout: 10000 },
  async () => {
    await renderApp(<VehiculesRoute />);

    const newVehicule = createVehicule();

    expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /Créer vehicule/i }),
    );

    const drawer = await screen.findByRole('dialog', {
      name: /Créer vehicule/i,
    });

    const titleField = within(drawer).getByText(/title/i);
    const bodyField = within(drawer).getByText(/body/i);

    await userEvent.type(titleField, newVehicule.title);
    await userEvent.type(bodyField, newVehicule.body);

    const submitButton = within(drawer).getByRole('button', {
      name: /submit/i,
    });

    await userEvent.click(submitButton);

    await waitFor(() => expect(drawer).not.toBeInTheDocument());

    const row = await screen.findByRole(
      'row',
      {
        name: `${newVehicule.title} ${formatDate(newVehicule.createdAt)} View Delete Vehicule`,
      },
      { timeout: 5000 },
    );

    expect(
      within(row).getByRole('cell', {
        name: newVehicule.title,
      }),
    ).toBeInTheDocument();

    await userEvent.click(
      within(row).getByRole('button', {
        name: /delete vehicule/i,
      }),
    );

    const confirmationDialog = await screen.findByRole('dialog', {
      name: /delete vehicule/i,
    });

    const confirmationDeleteButton = within(confirmationDialog).getByRole(
      'button',
      {
        name: /delete vehicule/i,
      },
    );

    await userEvent.click(confirmationDeleteButton);

    await screen.findByText(/vehicule deleted/i);

    expect(
      within(row).queryByRole('cell', {
        name: newVehicule.title,
      }),
    ).not.toBeInTheDocument();
  },
);
