import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  createBans,
  createUser,
  within,
} from '@/testing/test-utils';

import { default as BansRoute } from '../ban';

const renderBans = async () => {
  const fakeUser = await createUser();
  const fakeBans = await createBans({ teamId: fakeUser.teamId });

  const utils = await renderApp(<BansRoute />, {
    user: fakeUser,
    path: `/app/bans/:banId`,
    url: `/app/bans/${fakeBans.id}`,
  });

  await screen.findByText(fakeBans.title);

  return {
    ...utils,
    fakeUser,
    fakeBans,
  };
};

test('should render ban', async () => {
  const { fakeBans } = await renderBans();
  expect(screen.getByText(fakeBans.body)).toBeInTheDocument();
});

test('should update ban', async () => {
  const { fakeBans } = await renderBans();

  const titleUpdate = '-Updated';
  const bodyUpdate = '-Updated';

  await userEvent.click(screen.getByRole('button', { name: /update ban/i }));

  const drawer = await screen.findByRole('dialog', {
    name: /update ban/i,
  });

  const titleField = within(drawer).getByText(/title/i);
  const bodyField = within(drawer).getByText(/body/i);

  const newTitle = `${fakeBans.title}${titleUpdate}`;
  const newBody = `${fakeBans.body}${bodyUpdate}`;

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
  'should create and delete a comment on the ban',
  async () => {
    await renderBans();

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
