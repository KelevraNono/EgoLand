import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Vehicule } from '@/types/api';

import { getVehiculesQueryOptions } from './get-vehicules';

export const createVehiculeInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type CreateVehiculeInput = z.infer<typeof createVehiculeInputSchema>;

export const createVehicule = ({
  data,
}: {
  data: CreateVehiculeInput;
}): Promise<Vehicule> => {
  return api.post(`/vehicules`, data);
};

type UseCreateVehiculeOptions = {
  mutationConfig?: MutationConfig<typeof createVehicule>;
};

export const useCreateVehicule = ({
  mutationConfig,
}: UseCreateVehiculeOptions = {}) => {
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
    mutationFn: createVehicule,
  });
};
