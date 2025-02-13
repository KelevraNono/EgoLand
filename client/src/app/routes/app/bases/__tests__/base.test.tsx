import { default as BaseRoute } from '../base';

import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  createBase,
  createUser,
  within,
} from '@/testing/test-utils';

const renderBase = async () => {
  const fakeUser = await createUser();
  const fakeBase = await createBase({ teamId: fakeUser.teamId });

  const utils = await renderApp(<BaseRoute />, {
    user: fakeUser,
    path: `/app/bases/:baseId`,
    url: `/app/bases/${fakeBase.id}`,
  });

  await screen.findByText(fakeBase.title);

  return {
    ...utils,
    fakeUser,
    fakeBase,
  };
};

test('should render base', async () => {
  const { fakeBase } = await renderBase();
  expect(screen.getByText(fakeBase.body)).toBeInTheDocument();
});

test('should update base', async () => {
  const { fakeBase } = await renderBase();

  const titleUpdate = '-Updated';
  const bodyUpdate = '-Updated';

  await userEvent.click(screen.getByRole('button', { name: /update base/i }));

  const drawer = await screen.findByRole('dialog', {
    name: /update base/i,
  });

  const titleField = within(drawer).getByText(/title/i);
  const bodyField = within(drawer).getByText(/body/i);

  const newTitle = `${fakeBase.title}${titleUpdate}`;
  const newBody = `${fakeBase.body}${bodyUpdate}`;

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
  'should create and delete a comment on the base',
  async () => {
    await renderBase();

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
