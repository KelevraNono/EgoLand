import { t } from 'i18next';

import { MDPreview } from '@/components/ui/md-preview';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/utils/format';

import { useEvent } from '../api/get-event';

import { UpdateEvent } from './update-event';

export const EventView = ({ eventId }: { eventId: string }) => {
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

  const event = eventQuery?.data?.data;

  if (!event) return null;

  return (
    <div>
      <span className="text-xs font-bold">{formatDate(event.createdAt)}</span>
      {event.author && (
        <span className="ml-2 text-sm font-bold">
          {t('by')} {event.author.firstName} {event.author.lastName}
        </span>
      )}
      <div className="mt-6 flex flex-col space-y-16">
        <div className="flex justify-end">
          <UpdateEvent eventId={eventId} />
        </div>
        <div>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-2xl text-sm">
                <MDPreview value={event.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
