import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Ban } from '@/types/api';

export const getBan = ({
  banId,
}: {
  banId: string;
}): Promise<{ data: Ban }> => {
  return api.get(`/bans/${banId}`);
};

export const getBanQueryOptions = (banId: string) => {
  return queryOptions({
    queryKey: ['bans', banId],
    queryFn: () => getBan({ banId }),
  });
};

type UseBanOptions = {
  banId: string;
  queryConfig?: QueryConfig<typeof getBanQueryOptions>;
};

export const useBan = ({ banId, queryConfig }: UseBanOptions) => {
  return useQuery({
    ...getBanQueryOptions(banId),
    ...queryConfig,
  });
};
