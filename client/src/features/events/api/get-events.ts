import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Event, Meta } from '@/types/api';

export const getEvents = (
  page = 1,
): Promise<{
  data: Event[];
  meta: Meta;
}> => {
  return api.get(`/events`, {
    params: {
      page,
    },
  });
};

export const getEventsQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['events', { page }] : ['events'],
    queryFn: () => getEvents(page),
  });
};

type UseEventsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getEventsQueryOptions>;
};

export const useEvents = ({ queryConfig, page }: UseEventsOptions) => {
  return useQuery({
    ...getEventsQueryOptions({ page }),
    ...queryConfig,
  });
};
