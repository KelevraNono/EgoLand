import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Warning, Meta } from '@/types/api';

export const getWarnings = (
  page = 1,
): Promise<{
  data: Warning[];
  meta: Meta;
}> => {
  return api.get(`/warnings`, {
    params: {
      page,
    },
  });
};

export const getWarningsQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['warnings', { page }] : ['warnings'],
    queryFn: () => getWarnings(page),
  });
};

type UseWarningsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getWarningsQueryOptions>;
};

export const useWarnings = ({ queryConfig, page }: UseWarningsOptions) => {
  return useQuery({
    ...getWarningsQueryOptions({ page }),
    ...queryConfig,
  });
};
