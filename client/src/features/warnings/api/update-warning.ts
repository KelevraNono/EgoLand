import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Warning } from '@/types/api';

import { getWarningQueryOptions } from './get-warning';

export const updateWarningInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type UpdateWarningInput = z.infer<typeof updateWarningInputSchema>;

export const updateWarning = ({
  data,
  warningId,
}: {
  data: UpdateWarningInput;
  warningId: string;
}): Promise<Warning> => {
  return api.patch(`/warnings/${warningId}`, data);
};

type UseUpdateWarningOptions = {
  mutationConfig?: MutationConfig<typeof updateWarning>;
};

export const useUpdateWarning = ({
  mutationConfig,
}: UseUpdateWarningOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getWarningQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateWarning,
  });
};
