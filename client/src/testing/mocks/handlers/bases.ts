import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, networkDelay } from '../utils';

type BaseBody = {
  title: string;
  body: string;
};

export const basesHandlers = [
  http.get(`${env.API_URL}/bases`, async ({ cookies, request }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const url = new URL(request.url);

      const page = Number(url.searchParams.get('page') || 1);

      const total = db.base.count();

      const totalPages = Math.ceil(total / 10);

      const result = db.base.findMany({
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

  http.get(`${env.API_URL}/bases/:baseId`, async ({ params, cookies }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const baseId = params.baseId as string;
      const base = db.base.findFirst({
        where: {
          id: {
            equals: baseId,
          },
        },
      });

      if (!base) {
        return HttpResponse.json(
          { message: 'Base not found' },
          { status: 404 },
        );
      }

      const result = {
        ...base,
      };

      return HttpResponse.json({ data: result });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/bases`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const data = (await request.json()) as BaseBody;
      requireAdmin(user);
      const result = db.base.create({
        ...data,
      });
      await persistDb('base');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.patch(
    `${env.API_URL}/bases/:baseId`,
    async ({ request, params, cookies }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const data = (await request.json()) as BaseBody;
        const baseId = params.baseId as string;
        requireAdmin(user);
        const result = db.base.update({
          where: {
            id: {
              equals: baseId,
            },
          },
          data,
        });
        await persistDb('base');
        return HttpResponse.json(result);
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 },
        );
      }
    },
  ),

  http.delete(`${env.API_URL}/bases/:baseId`, async ({ cookies, params }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const baseId = params.baseId as string;
      requireAdmin(user);
      const result = db.base.delete({
        where: {
          id: {
            equals: baseId,
          },
        },
      });
      await persistDb('base');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
