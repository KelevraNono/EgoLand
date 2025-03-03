import { HttpResponse, http } from 'msw';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, networkDelay } from '../utils';

import { env } from '@/config/env';

type EventBody = {
  title: string;
  body: string;
};

export const eventsHandlers = [
  http.get(`${env.API_URL}/events`, async ({ cookies, request }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const url = new URL(request.url);

      const page = Number(url.searchParams.get('page') || 1);

      const total = db.event.count();

      const totalPages = Math.ceil(total / 10);

      const result = db.event.findMany({
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

  http.get(`${env.API_URL}/events/:eventId`, async ({ params, cookies }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const eventId = params.eventId as string;
      const event = db.event.findFirst({
        where: {
          id: {
            equals: eventId,
          },
        },
      });

      if (!event) {
        return HttpResponse.json(
          { message: 'Event not found' },
          { status: 404 },
        );
      }

      const result = {
        ...event,
      };

      return HttpResponse.json({ data: result });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/events`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const data = (await request.json()) as EventBody;
      requireAdmin(user);
      const result = db.event.create({
        ...data,
      });
      await persistDb('event');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.patch(
    `${env.API_URL}/events/:eventId`,
    async ({ request, params, cookies }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const data = (await request.json()) as EventBody;
        const eventId = params.eventId as string;
        requireAdmin(user);
        const result = db.event.update({
          where: {
            id: {
              equals: eventId,
            },
          },
          data,
        });
        await persistDb('event');
        return HttpResponse.json(result);
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 },
        );
      }
    },
  ),

  http.delete(`${env.API_URL}/events/:eventId`, async ({ cookies, params }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const eventId = params.eventId as string;
      requireAdmin(user);
      const result = db.event.delete({
        where: {
          id: {
            equals: eventId,
          },
        },
      });
      await persistDb('event');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
