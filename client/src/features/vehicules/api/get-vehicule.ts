import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Vehicule } from '@/types/api';

export const getVehicule = ({
  vehiculeId,
}: {
  vehiculeId: string;
}): Promise<{ data: Vehicule }> => {
  return api.get(`/vehicules/${vehiculeId}`);
};

export const getVehiculeQueryOptions = (vehiculeId: string) => {
  return queryOptions({
    queryKey: ['vehicules', vehiculeId],
    queryFn: () => getVehicule({ vehiculeId }),
  });
};

type UseVehiculeOptions = {
  vehiculeId: string;
  queryConfig?: QueryConfig<typeof getVehiculeQueryOptions>;
};

export const useVehicule = ({
  vehiculeId,
  queryConfig,
}: UseVehiculeOptions) => {
  return useQuery({
    ...getVehiculeQueryOptions(vehiculeId),
    ...queryConfig,
  });
};
