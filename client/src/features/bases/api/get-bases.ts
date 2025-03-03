import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Base, Meta } from '@/types/api';

export const getBases = (
  page = 1,
): Promise<{
  data: Base[];
  meta: Meta;
}> => {
  return api.get(`/bases`, {
    params: {
      page,
    },
  });
};

export const getBasesQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['bases', { page }] : ['bases'],
    queryFn: () => getBases(page),
  });
};

type UseBasesOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getBasesQueryOptions>;
};

export const useBases = ({ queryConfig, page }: UseBasesOptions) => {
  return useQuery({
    ...getBasesQueryOptions({ page }),
    ...queryConfig,
  });
};
