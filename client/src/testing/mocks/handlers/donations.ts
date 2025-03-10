import { HttpResponse, http } from 'msw';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, networkDelay } from '../utils';

import { env } from '@/config/env';

type DonationBody = {
  title: string;
  body: string;
};

export const donationsHandlers = [
  http.get(`${env.API_URL}/donations`, async ({ cookies, request }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const url = new URL(request.url);

      const page = Number(url.searchParams.get('page') || 1);

      const total = db.donation.count();

      const totalPages = Math.ceil(total / 10);

      const result = db.donation.findMany({
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
    `${env.API_URL}/donations/:donationId`,
    async ({ params, cookies }) => {
      await networkDelay();

      try {
        const { error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const donationId = params.donationId as string;
        const donation = db.donation.findFirst({
          where: {
            id: {
              equals: donationId,
            },
          },
        });

        if (!donation) {
          return HttpResponse.json(
            { message: 'Donation not found' },
            { status: 404 },
          );
        }

        const result = {
          ...donation,
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

  http.post(`${env.API_URL}/donations`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const data = (await request.json()) as DonationBody;
      requireAdmin(user);
      const result = db.donation.create({
        ...data,
      });
      await persistDb('donation');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.patch(
    `${env.API_URL}/donations/:donationId`,
    async ({ request, params, cookies }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const data = (await request.json()) as DonationBody;
        const donationId = params.donationId as string;
        requireAdmin(user);
        const result = db.donation.update({
          where: {
            id: {
              equals: donationId,
            },
          },
          data,
        });
        await persistDb('donation');
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
    `${env.API_URL}/donations/:donationId`,
    async ({ cookies, params }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const donationId = params.donationId as string;
        requireAdmin(user);
        const result = db.donation.delete({
          where: {
            id: {
              equals: donationId,
            },
          },
        });
        await persistDb('donation');
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
