import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, networkDelay } from '../utils';

type VehiculeBody = {
  title: string;
  body: string;
};

export const vehiculesHandlers = [
  http.get(`${env.API_URL}/vehicules`, async ({ cookies, request }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const url = new URL(request.url);

      const page = Number(url.searchParams.get('page') || 1);

      const total = db.vehicule.count();

      const totalPages = Math.ceil(total / 10);

      const result = db.vehicule.findMany({
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
    `${env.API_URL}/vehicules/:vehiculeId`,
    async ({ params, cookies }) => {
      await networkDelay();

      try {
        const { error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const vehiculeId = params.vehiculeId as string;
        const vehicule = db.vehicule.findFirst({
          where: {
            id: {
              equals: vehiculeId,
            },
          },
        });

        if (!vehicule) {
          return HttpResponse.json(
            { message: 'Vehicule not found' },
            { status: 404 },
          );
        }

        const result = {
          ...vehicule,
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

  http.post(`${env.API_URL}/vehicules`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const data = (await request.json()) as VehiculeBody;
      requireAdmin(user);
      const result = db.vehicule.create({
        ...data,
      });
      await persistDb('vehicule');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.patch(
    `${env.API_URL}/vehicules/:vehiculeId`,
    async ({ request, params, cookies }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const data = (await request.json()) as VehiculeBody;
        const vehiculeId = params.vehiculeId as string;
        requireAdmin(user);
        const result = db.vehicule.update({
          where: {
            id: {
              equals: vehiculeId,
            },
          },
          data,
        });
        await persistDb('vehicule');
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
    `${env.API_URL}/vehicules/:vehiculeId`,
    async ({ cookies, params }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const vehiculeId = params.vehiculeId as string;
        requireAdmin(user);
        const result = db.vehicule.delete({
          where: {
            id: {
              equals: vehiculeId,
            },
          },
        });
        await persistDb('vehicule');
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
