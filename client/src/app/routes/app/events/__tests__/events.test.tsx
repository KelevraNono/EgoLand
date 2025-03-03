import type { Mock } from 'vitest';

import { createEvent } from '@/testing/data-generators';
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils';
import { formatDate } from '@/utils/format';

import { default as EventsRoute } from '../events';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as Mock).mockRestore();
});

test(
  'should create, render and delete events',
  { timeout: 10000 },
  async () => {
    await renderApp(<EventsRoute />);

    const newEvent = createEvent();

    expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Créer event/i }));

    const drawer = await screen.findByRole('dialog', {
      name: /Créer event/i,
    });

    const titleField = within(drawer).getByText(/title/i);
    const bodyField = within(drawer).getByText(/body/i);

    await userEvent.type(titleField, newEvent.title);
    await userEvent.type(bodyField, newEvent.body);

    const submitButton = within(drawer).getByRole('button', {
      name: /submit/i,
    });

    await userEvent.click(submitButton);

    await waitFor(() => expect(drawer).not.toBeInTheDocument());

    const row = await screen.findByRole(
      'row',
      {
        name: `${newEvent.title} ${formatDate(newEvent.createdAt)} View Delete Event`,
      },
      { timeout: 5000 },
    );

    expect(
      within(row).getByRole('cell', {
        name: newEvent.title,
      }),
    ).toBeInTheDocument();

    await userEvent.click(
      within(row).getByRole('button', {
        name: /delete event/i,
      }),
    );

    const confirmationDialog = await screen.findByRole('dialog', {
      name: /delete event/i,
    });

    const confirmationDeleteButton = within(confirmationDialog).getByRole(
      'button',
      {
        name: /delete event/i,
      },
    );

    await userEvent.click(confirmationDeleteButton);

    await screen.findByText(/event deleted/i);

    expect(
      within(row).queryByRole('cell', {
        name: newEvent.title,
      }),
    ).not.toBeInTheDocument();
  },
);
