import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Vehicule, Meta } from '@/types/api';

export const getVehicules = (
  page = 1,
): Promise<{
  data: Vehicule[];
  meta: Meta;
}> => {
  return api.get(`/vehicules`, {
    params: {
      page,
    },
  });
};

export const getVehiculesQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['vehicules', { page }] : ['vehicules'],
    queryFn: () => getVehicules(page),
  });
};

type UseVehiculesOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getVehiculesQueryOptions>;
};

export const useVehicules = ({ queryConfig, page }: UseVehiculesOptions) => {
  return useQuery({
    ...getVehiculesQueryOptions({ page }),
    ...queryConfig,
  });
};
