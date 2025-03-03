import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Base } from '@/types/api';

export const getBase = ({
  baseId,
}: {
  baseId: string;
}): Promise<{ data: Base }> => {
  return api.get(`/bases/${baseId}`);
};

export const getBaseQueryOptions = (baseId: string) => {
  return queryOptions({
    queryKey: ['bases', baseId],
    queryFn: () => getBase({ baseId }),
  });
};

type UseBaseOptions = {
  baseId: string;
  queryConfig?: QueryConfig<typeof getBaseQueryOptions>;
};

export const useBase = ({ baseId, queryConfig }: UseBaseOptions) => {
  return useQuery({
    ...getBaseQueryOptions(baseId),
    ...queryConfig,
  });
};
