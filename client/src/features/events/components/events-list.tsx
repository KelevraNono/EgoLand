import { t } from 'i18next';
import { useSearchParams } from 'react-router';

import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { useEvents } from '../api/get-events';

import { DeleteEvent } from './delete-event';

export const EventsList = () => {
  const [searchParams] = useSearchParams();

  const eventsQuery = useEvents({
    page: +(searchParams.get('page') || 1),
  });

  if (eventsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const events = eventsQuery.data?.data;
  const meta = eventsQuery.data?.meta;

  if (!events) return null;

  return (
    <Table
      data={events}
      columns={[
        {
          title: t('content'),
          field: 'title',
        },
        {
          title: t('createdAt'),
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteEvent id={id} />;
          },
        },
      ]}
      pagination={
        meta && {
          totalPages: meta.totalPages,
          currentPage: meta.page,
          rootUrl: '',
        }
      }
    />
  );
};
