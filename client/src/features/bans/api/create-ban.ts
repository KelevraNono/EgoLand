import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Ban } from '@/types/api';

import { getBansQueryOptions } from './get-bans';

export const createBanInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type CreateBanInput = z.infer<typeof createBanInputSchema>;

export const createBan = ({ data }: { data: CreateBanInput }): Promise<Ban> => {
  return api.post(`/bans`, data);
};

type UseCreateBanOptions = {
  mutationConfig?: MutationConfig<typeof createBan>;
};

export const useCreateBan = ({ mutationConfig }: UseCreateBanOptions = {}) => {
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
    mutationFn: createBan,
  });
};
