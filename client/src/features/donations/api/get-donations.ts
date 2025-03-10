import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Donation, Meta } from '@/types/api';

export const getDonations = (
  page = 1,
): Promise<{
  data: Donation[];
  meta: Meta;
}> => {
  return api.get(`/donations`, {
    params: {
      page,
    },
  });
};

export const getDonationsQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['donations', { page }] : ['donations'],
    queryFn: () => getDonations(page),
  });
};

type UseDonationsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getDonationsQueryOptions>;
};

export const useDonations = ({ queryConfig, page }: UseDonationsOptions) => {
  return useQuery({
    ...getDonationsQueryOptions({ page }),
    ...queryConfig,
  });
};
