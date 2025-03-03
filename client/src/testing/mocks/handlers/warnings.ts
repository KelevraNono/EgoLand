import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, networkDelay } from '../utils';

type WarningBody = {
  title: string;
  body: string;
};

export const warningsHandlers = [
  http.get(`${env.API_URL}/warnings`, async ({ cookies, request }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const url = new URL(request.url);

      const page = Number(url.searchParams.get('page') || 1);

      const total = db.warning.count();

      const totalPages = Math.ceil(total / 10);

      const result = db.warning.findMany({
        take: 10,
        skip: 10 * (page - 1),
      });
      return HttpResponse.json({
        data: result,
        meta: {
          page,
          total,
          totalPages,
        },
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.get(
    `${env.API_URL}/warnings/:warningId`,
    async ({ params, cookies }) => {
      await networkDelay();

      try {
        const { error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const warningId = params.warningId as string;
        const warning = db.warning.findFirst({
          where: {
            id: {
              equals: warningId,
            },
          },
        });

        if (!warning) {
          return HttpResponse.json(
            { message: 'Warning not found' },
            { status: 404 },
          );
        }

        const result = {
          ...warning,
        };

        return HttpResponse.json({ data: result });
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 },
        );
      }
    },
  ),

  http.post(`${env.API_URL}/warnings`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const data = (await request.json()) as WarningBody;
      requireAdmin(user);
      const result = db.warning.create({
        ...data,
      });
      await persistDb('warning');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.patch(
    `${env.API_URL}/warnings/:warningId`,
    async ({ request, params, cookies }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const data = (await request.json()) as WarningBody;
        const warningId = params.warningId as string;
        requireAdmin(user);
        const result = db.warning.update({
          where: {
            id: {
              equals: warningId,
            },
          },
          data,
        });
        await persistDb('warning');
        return HttpResponse.json(result);
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 },
        );
      }
    },
  ),

  http.delete(
    `${env.API_URL}/warnings/:warningId`,
    async ({ cookies, params }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const warningId = params.warningId as string;
        requireAdmin(user);
        const result = db.warning.delete({
          where: {
            id: {
              equals: warningId,
            },
          },
        });
        await persistDb('warning');
        return HttpResponse.json(result);
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 },
        );
      }
    },
  ),
];
