import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getWarningsQueryOptions } from './get-warnings';

export const deleteWarning = ({ warningId }: { warningId: string }) => {
  return api.delete(`/warnings/${warningId}`);
};

type UseDeleteWarningOptions = {
  mutationConfig?: MutationConfig<typeof deleteWarning>;
};

export const useDeleteWarning = ({
  mutationConfig,
}: UseDeleteWarningOptions = {}) => {
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
    mutationFn: deleteWarning,
  });
};
