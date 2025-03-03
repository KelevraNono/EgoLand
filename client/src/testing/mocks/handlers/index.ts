import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { networkDelay } from '../utils';

import { authHandlers } from './auth';
import { bansHandlers } from './bans';
import { basesHandlers } from './bases';
import { commentsHandlers } from './comments';
import { discussionsHandlers } from './discussions';
import { eventsHandlers } from './events';
import { teamsHandlers } from './teams';
import { usersHandlers } from './users';
import { vehiculesHandlers } from './vehicules';
import { warningsHandlers } from './warnings';

export const handlers = [
  ...authHandlers,
  ...commentsHandlers,
  ...discussionsHandlers,
  ...teamsHandlers,
  ...usersHandlers,
  ...warningsHandlers,
  ...vehiculesHandlers,
  ...eventsHandlers,
  ...basesHandlers,
  ...bansHandlers,
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
