import { t } from 'i18next';

import { createUser } from '@/testing/data-generators';
import { renderApp, screen, userEvent, waitFor } from '@/testing/test-utils';

import { RegisterForm } from '../register-form';

test('should register new user and call onSuccess cb which should navigate the user to the app', async () => {
  const newUser = createUser({});

  const onSuccess = vi.fn();

  await renderApp(
    <RegisterForm
      onSuccess={onSuccess}
      chooseTeam={false}
      setChooseTeam={() => {}}
      teams={[]}
    />,
    { user: null },
  );

  await userEvent.type(
    screen.getByLabelText(t('firstName')),
    newUser.firstName,
  );
  await userEvent.type(screen.getByLabelText(t('lastName')), newUser.lastName);
  await userEvent.type(screen.getByLabelText(t('email')), newUser.email);
  await userEvent.type(screen.getByLabelText(t('password')), newUser.password);
  await userEvent.type(screen.getByLabelText(t('teamName')), newUser.teamName);

  await userEvent.click(screen.getByRole('button', { name: t('signIn') }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});
