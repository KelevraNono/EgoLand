import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Vehicule } from '@/types/api';

import { getVehiculeQueryOptions } from './get-vehicule';

export const updateVehiculeInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type UpdateVehiculeInput = z.infer<typeof updateVehiculeInputSchema>;

export const updateVehicule = ({
  data,
  vehiculeId,
}: {
  data: UpdateVehiculeInput;
  vehiculeId: string;
}): Promise<Vehicule> => {
  return api.patch(`/vehicules/${vehiculeId}`, data);
};

type UseUpdateVehiculeOptions = {
  mutationConfig?: MutationConfig<typeof updateVehicule>;
};

export const useUpdateVehicule = ({
  mutationConfig,
}: UseUpdateVehiculeOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getVehiculeQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateVehicule,
  });
};
