import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Warning } from '@/types/api';

import { getWarningsQueryOptions } from './get-warnings';

export const createWarningInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type CreateWarningInput = z.infer<typeof createWarningInputSchema>;

export const createWarning = ({
  data,
}: {
  data: CreateWarningInput;
}): Promise<Warning> => {
  return api.post(`/warnings`, data);
};

type UseCreateWarningOptions = {
  mutationConfig?: MutationConfig<typeof createWarning>;
};

export const useCreateWarning = ({
  mutationConfig,
}: UseCreateWarningOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getWarningsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createWarning,
  });
};
