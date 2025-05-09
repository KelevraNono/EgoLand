import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Event } from '@/types/api';

import { getEventQueryOptions } from './get-event';

export const updateEventInputSchema = z.object({
  title: z.string().min(1, 'Obligatoire'),
  body: z.string().min(1, 'Obligatoire'),
});

export type UpdateEventInput = z.infer<typeof updateEventInputSchema>;

export const updateEvent = ({
  data,
  eventId,
}: {
  data: UpdateEventInput;
  eventId: string;
}): Promise<Event> => {
  return api.patch(`/events/${eventId}`, data);
};

type UseUpdateEventOptions = {
  mutationConfig?: MutationConfig<typeof updateEvent>;
};

export const useUpdateEvent = ({
  mutationConfig,
}: UseUpdateEventOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getEventQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateEvent,
  });
};
