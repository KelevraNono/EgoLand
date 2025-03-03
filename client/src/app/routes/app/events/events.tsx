import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { getEventsQueryOptions } from '@/features/events/api/get-events';
import { CreateEvent } from '@/features/events/components/create-event';
import { EventsList } from '@/features/events/components/events-list';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getEventsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const EventsRoute = () => {
  return (
    <ContentLayout title="Events">
      <div className="flex justify-end">
        <CreateEvent />
      </div>
      <div className="mt-4">
        <EventsList />
      </div>
    </ContentLayout>
  );
};

export default EventsRoute;
