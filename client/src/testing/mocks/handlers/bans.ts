import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, networkDelay } from '../utils';

type BanBody = {
  title: string;
  body: string;
};

export const bansHandlers = [
  http.get(`${env.API_URL}/bans`, async ({ cookies, request }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const url = new URL(request.url);

      const page = Number(url.searchParams.get('page') || 1);

      const total = db.ban.count();

      const totalPages = Math.ceil(total / 10);

      const result = db.ban.findMany({
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

  http.get(`${env.API_URL}/bans/:banId`, async ({ params, cookies }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const banId = params.banId as string;
      const ban = db.ban.findFirst({
        where: {
          id: {
            equals: banId,
          },
        },
      });

      if (!ban) {
        return HttpResponse.json({ message: 'Ban not found' }, { status: 404 });
      }

      const result = {
        ...ban,
      };

      return HttpResponse.json({ data: result });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/bans`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const data = (await request.json()) as BanBody;
      requireAdmin(user);
      const result = db.ban.create({
        ...data,
      });
      await persistDb('ban');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.patch(
    `${env.API_URL}/bans/:banId`,
    async ({ request, params, cookies }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const data = (await request.json()) as BanBody;
        const banId = params.banId as string;
        requireAdmin(user);
        const result = db.ban.update({
          where: {
            id: {
              equals: banId,
            },
          },
          data,
        });
        await persistDb('ban');
        return HttpResponse.json(result);
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 },
        );
      }
    },
  ),

  http.delete(`${env.API_URL}/bans/:banId`, async ({ cookies, params }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const banId = params.banId as string;
      requireAdmin(user);
      const result = db.ban.delete({
        where: {
          id: {
            equals: banId,
          },
        },
      });
      await persistDb('ban');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
