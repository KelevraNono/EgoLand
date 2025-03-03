import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getVehiculesQueryOptions } from './get-vehicules';

export const deleteVehicule = ({ vehiculeId }: { vehiculeId: string }) => {
  return api.delete(`/vehicules/${vehiculeId}`);
};

type UseDeleteVehiculeOptions = {
  mutationConfig?: MutationConfig<typeof deleteVehicule>;
};

export const useDeleteVehicule = ({
  mutationConfig,
}: UseDeleteVehiculeOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getVehiculesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteVehicule,
  });
};
