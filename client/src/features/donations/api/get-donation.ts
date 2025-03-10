import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Donation } from '@/types/api';

export const getDonation = ({
  donationId,
}: {
  donationId: string;
}): Promise<{ data: Donation }> => {
  return api.get(`/donations/${donationId}`);
};

export const getDonationQueryOptions = (donationId: string) => {
  return queryOptions({
    queryKey: ['donations', donationId],
    queryFn: () => getDonation({ donationId }),
  });
};

type UseDonationOptions = {
  donationId: string;
  queryConfig?: QueryConfig<typeof getDonationQueryOptions>;
};

export const useDonation = ({
  donationId,
  queryConfig,
}: UseDonationOptions) => {
  return useQuery({
    ...getDonationQueryOptions(donationId),
    ...queryConfig,
  });
};
