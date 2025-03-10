import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';
import { RouterProvider, createMemoryRouter } from 'react-router';

import { AppProvider } from '@/app/provider';

import {
  createDiscussion as generateDiscussion,
  createWarning as generateWarning,
  createEvent as generateEvent,
  createBase as generateBase,
  createBan as generateBan,
  createVehicule as generateVehicule,
  createUser as generateUser,
  createDonation as generateDonation,
} from './data-generators';
import { db } from './mocks/db';
import { AUTH_COOKIE, authenticate, hash } from './mocks/utils';

export const createUser = async (userProperties?: any) => {
  const user = generateUser(userProperties) as any;
  await db.user.create({ ...user, password: hash(user.password) });
  return user;
};

export const createDiscussion = async (discussionProperties?: any) => {
  const discussion = generateDiscussion(discussionProperties);
  const res = await db.discussion.create(discussion);
  return res;
};

export const createBase = async (baseProperties?: any) => {
  const base = generateBase(baseProperties);
  const res = await db.base.create(base);
  return res;
};

export const createBan = async (banProperties?: any) => {
  const ban = generateBan(banProperties);
  const res = await db.ban.create(ban);
  return res;
};

export const createEvent = async (eventProperties?: any) => {
  const event = generateEvent(eventProperties);
  const res = await db.event.create(event);
  return res;
};

export const createVehicule = async (vehiculeProperties?: any) => {
  const vehicule = generateVehicule(vehiculeProperties);
  const res = await db.vehicule.create(vehicule);
  return res;
};

export const createWarning = async (warningProperties?: any) => {
  const warning = generateWarning(warningProperties);
  const res = await db.warning.create(warning);
  return res;
};

export const createDonation = async (donationProperties?: any) => {
  const donation = generateDonation(donationProperties);
  const res = await db.donation.create(donation);
  return res;
};

export const loginAsUser = async (user: any) => {
  const authUser = await authenticate(user);
  Cookies.set(AUTH_COOKIE, authUser.jwt);
  return authUser;
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );

const initializeUser = async (user: any) => {
  if (typeof user === 'undefined') {
    const newUser = await createUser();
    return loginAsUser(newUser);
  } else if (user) {
    return loginAsUser(user);
  } else {
    return null;
  }
};

export const renderApp = async (
  ui: any,
  { user, url = '/', path = '/', ...renderOptions }: Record<string, any> = {},
) => {
  // if you want to render the app unauthenticated then pass "null" as the user
  const initializedUser = await initializeUser(user);

  const router = createMemoryRouter(
    [
      {
        path: path,
        element: ui,
      },
    ],
    {
      initialEntries: url ? ['/', url] : ['/'],
      initialIndex: url ? 1 : 0,
    },
  );

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: () => {
        return (
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        );
      },
      ...renderOptions,
    }),
    user: initializedUser,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

export * from '@testing-library/react';
export { userEvent, rtlRender };
