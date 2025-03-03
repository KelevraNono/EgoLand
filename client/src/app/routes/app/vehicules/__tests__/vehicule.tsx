import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  createVehicule,
  createUser,
  within,
} from '@/testing/test-utils';

import { default as VehiculeRoute } from '../vehicule';

const renderVehicule = async () => {
  const fakeUser = await createUser();
  const fakeVehicule = await createVehicule({ teamId: fakeUser.teamId });

  const utils = await renderApp(<VehiculeRoute />, {
    user: fakeUser,
    path: `/app/vehicules/:vehiculeId`,
    url: `/app/vehicules/${fakeVehicule.id}`,
  });

  await screen.findByText(fakeVehicule.title);

  return {
    ...utils,
    fakeUser,
    fakeVehicule,
  };
};

test('should render vehicule', async () => {
  const { fakeVehicule } = await renderVehicule();
  expect(screen.getByText(fakeVehicule.body)).toBeInTheDocument();
});

test('should update vehicule', async () => {
  const { fakeVehicule } = await renderVehicule();

  const titleUpdate = '-Updated';
  const bodyUpdate = '-Updated';

  await userEvent.click(
    screen.getByRole('button', { name: /update vehicule/i }),
  );

  const drawer = await screen.findByRole('dialog', {
    name: /update vehicule/i,
  });

  const titleField = within(drawer).getByText(/title/i);
  const bodyField = within(drawer).getByText(/body/i);

  const newTitle = `${fakeVehicule.title}${titleUpdate}`;
  const newBody = `${fakeVehicule.body}${bodyUpdate}`;

  // replacing the title with the new title
  await userEvent.type(titleField, newTitle);

  // appending updated to the body
  await userEvent.type(bodyField, bodyUpdate);

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  });

  await userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  expect(
    await screen.findByRole('heading', { name: newTitle }),
  ).toBeInTheDocument();
  expect(await screen.findByText(newBody)).toBeInTheDocument();
});

test(
  'should create and delete a comment on the vehicule',
  async () => {
    await renderVehicule();

    const comment = 'Hello World';

    await userEvent.click(
      screen.getByRole('button', { name: /create comment/i }),
    );

    const drawer = await screen.findByRole('dialog', {
      name: /create comment/i,
    });

    const bodyField = await within(drawer).findByText(/body/i);

    await userEvent.type(bodyField, comment);

    const submitButton = await within(drawer).findByRole('button', {
      name: /submit/i,
    });

    await userEvent.click(submitButton);

    await waitFor(() => expect(drawer).not.toBeInTheDocument());

    await screen.findByText(comment);

    const commentsList = await screen.findByRole('list', {
      name: 'comments',
    });

    const commentElements =
      await within(commentsList).findAllByRole('listitem');

    const commentElement = commentElements[0];

    expect(commentElement).toBeInTheDocument();

    const deleteCommentButton = within(commentElement).getByRole('button', {
      name: /delete comment/i,
      // exact: false,
    });

    await userEvent.click(deleteCommentButton);

    const confirmationDialog = await screen.findByRole('dialog', {
      name: /delete comment/i,
    });

    const confirmationDeleteButton = await within(
      confirmationDialog,
    ).findByRole('button', {
      name: /delete/i,
    });

    await userEvent.click(confirmationDeleteButton);

    await screen.findByText(/comment deleted/i);

    await waitFor(() => {
      expect(within(commentsList).queryByText(comment)).not.toBeInTheDocument();
    });
  },
  {
    timeout: 20000,
  },
);
