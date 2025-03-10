import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { getDonationQueryOptions } from './get-donation';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Donation } from '@/types/api';

export const updateDonationInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type UpdateDonationInput = z.infer<typeof updateDonationInputSchema>;

export const updateDonation = ({
  data,
  donationId,
}: {
  data: UpdateDonationInput;
  donationId: string;
}): Promise<Donation> => {
  return api.patch(`/donations/${donationId}`, data);
};

type UseUpdateDonationOptions = {
  mutationConfig?: MutationConfig<typeof updateDonation>;
};

export const useUpdateDonation = ({
  mutationConfig,
}: UseUpdateDonationOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getDonationQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateDonation,
  });
};
