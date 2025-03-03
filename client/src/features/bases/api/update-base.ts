import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Base } from '@/types/api';

import { getBaseQueryOptions } from './get-base';

export const updateBaseInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type UpdateBaseInput = z.infer<typeof updateBaseInputSchema>;

export const updateBase = ({
  data,
  baseId,
}: {
  data: UpdateBaseInput;
  baseId: string;
}): Promise<Base> => {
  return api.patch(`/bases/${baseId}`, data);
};

type UseUpdateBaseOptions = {
  mutationConfig?: MutationConfig<typeof updateBase>;
};

export const useUpdateBase = ({
  mutationConfig,
}: UseUpdateBaseOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getBaseQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateBase,
  });
};
