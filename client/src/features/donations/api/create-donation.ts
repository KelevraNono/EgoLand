import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { getDonationsQueryOptions } from './get-donations';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Donation } from '@/types/api';

export const createDonationInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type CreateDonationInput = z.infer<typeof createDonationInputSchema>;

export const createDonation = ({
  data,
}: {
  data: CreateDonationInput;
}): Promise<Donation> => {
  return api.post(`/donations`, data);
};

type UseCreateDonationOptions = {
  mutationConfig?: MutationConfig<typeof createDonation>;
};

export const useCreateDonation = ({
  mutationConfig,
}: UseCreateDonationOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getDonationsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createDonation,
  });
};
