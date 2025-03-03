import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Base } from '@/types/api';

import { getBasesQueryOptions } from './get-bases';

export const createBaseInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type CreateBaseInput = z.infer<typeof createBaseInputSchema>;

export const createBase = ({
  data,
}: {
  data: CreateBaseInput;
}): Promise<Base> => {
  return api.post(`/bases`, data);
};

type UseCreateBaseOptions = {
  mutationConfig?: MutationConfig<typeof createBase>;
};

export const useCreateBase = ({
  mutationConfig,
}: UseCreateBaseOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getBasesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createBase,
  });
};
