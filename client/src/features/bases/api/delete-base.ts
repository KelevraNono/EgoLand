import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getBasesQueryOptions } from './get-bases';

export const deleteBase = ({ baseId }: { baseId: string }) => {
  return api.delete(`/bases/${baseId}`);
};

type UseDeleteBaseOptions = {
  mutationConfig?: MutationConfig<typeof deleteBase>;
};

export const useDeleteBase = ({
  mutationConfig,
}: UseDeleteBaseOptions = {}) => {
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
    mutationFn: deleteBase,
  });
};
