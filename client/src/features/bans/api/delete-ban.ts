import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getBansQueryOptions } from './get-bans';

export const deleteBan = ({ banId }: { banId: string }) => {
  return api.delete(`/bans/${banId}`);
};

type UseDeleteBanOptions = {
  mutationConfig?: MutationConfig<typeof deleteBan>;
};

export const useDeleteBan = ({ mutationConfig }: UseDeleteBanOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getBansQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteBan,
  });
};
