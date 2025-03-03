import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Ban, Meta } from '@/types/api';

export const getBans = (
  page = 1,
): Promise<{
  data: Ban[];
  meta: Meta;
}> => {
  return api.get(`/bans`, {
    params: {
      page,
    },
  });
};

export const getBansQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['bans', { page }] : ['bans'],
    queryFn: () => getBans(page),
  });
};

type UseBansOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getBansQueryOptions>;
};

export const useBans = ({ queryConfig, page }: UseBansOptions) => {
  return useQuery({
    ...getBansQueryOptions({ page }),
    ...queryConfig,
  });
};
