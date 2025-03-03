import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import {
  useEvent,
  getEventQueryOptions,
} from '@/features/events/api/get-event';
import { EventView } from '@/features/events/components/event-view';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const eventId = params.eventId as string;

    const eventQuery = getEventQueryOptions(eventId);

    const promises = [
      queryClient.getQueryData(eventQuery.queryKey) ??
        (await queryClient.fetchQuery(eventQuery)),
    ] as const;

    const [event] = await Promise.all(promises);

    return {
      event,
    };
  };

const EventRoute = () => {
  const params = useParams();
  const eventId = params.eventId as string;
  const eventQuery = useEvent({
    eventId,
  });

  if (eventQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const event = eventQuery.data?.data;

  if (!event) return null;

  return (
    <>
      <ContentLayout title={event.title}>
        <EventView eventId={eventId} />
      </ContentLayout>
    </>
  );
};

export default EventRoute;
