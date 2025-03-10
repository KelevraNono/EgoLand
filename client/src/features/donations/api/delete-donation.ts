import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getDonationsQueryOptions } from './get-donations';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const deleteDonation = ({ donationId }: { donationId: string }) => {
  return api.delete(`/donations/${donationId}`);
};

type UseDeleteDonationOptions = {
  mutationConfig?: MutationConfig<typeof deleteDonation>;
};

export const useDeleteDonation = ({
  mutationConfig,
}: UseDeleteDonationOptions = {}) => {
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
    mutationFn: deleteDonation,
  });
};
