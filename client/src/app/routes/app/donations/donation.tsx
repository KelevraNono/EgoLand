import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import {
  useDonation,
  getDonationQueryOptions,
} from '@/features/donations/api/get-donation';
import { DonationView } from '@/features/donations/components/donation-view';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const donationId = params.donationId as string;

    const donationQuery = getDonationQueryOptions(donationId);

    const promises = [
      queryClient.getQueryData(donationQuery.queryKey) ??
        (await queryClient.fetchQuery(donationQuery)),
    ] as const;

    const [donation] = await Promise.all(promises);

    return {
      donation,
    };
  };

const DonationRoute = () => {
  const params = useParams();
  const donationId = params.donationId as string;
  const donationQuery = useDonation({
    donationId,
  });

  if (donationQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const donation = donationQuery.data?.data;

  if (!donation) return null;

  return (
    <>
      <ContentLayout title={donation.title}>
        <DonationView donationId={donationId} />
      </ContentLayout>
    </>
  );
};

export default DonationRoute;
