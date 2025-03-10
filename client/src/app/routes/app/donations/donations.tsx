import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { getDonationsQueryOptions } from '@/features/donations/api/get-donations';
import { CreateDonation } from '@/features/donations/components/create-donation';
import { DonationsList } from '@/features/donations/components/donations-list';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getDonationsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const DonationsRoute = () => {
  return (
    <ContentLayout title="Donations">
      <div className="flex justify-end">
        <CreateDonation />
      </div>
      <div className="mt-4">
        <DonationsList />
      </div>
    </ContentLayout>
  );
};

export default DonationsRoute;
