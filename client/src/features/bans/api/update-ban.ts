import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Ban } from '@/types/api';

import { getBanQueryOptions } from './get-ban';

export const updateBanInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type UpdateBanInput = z.infer<typeof updateBanInputSchema>;

export const updateBan = ({
  data,
  banId,
}: {
  data: UpdateBanInput;
  banId: string;
}): Promise<Ban> => {
  return api.patch(`/bans/${banId}`, data);
};

type UseUpdateBanOptions = {
  mutationConfig?: MutationConfig<typeof updateBan>;
};

export const useUpdateBan = ({ mutationConfig }: UseUpdateBanOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getBanQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateBan,
  });
};
