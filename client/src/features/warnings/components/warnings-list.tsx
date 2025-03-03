import { t } from 'i18next';
import { useSearchParams } from 'react-router';

import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { useWarnings } from '../api/get-warnings';

import { DeleteWarning } from './delete-warning';

export type WarningsListProps = {
  onWarningPrefetch?: (id: string) => void;
};

export const WarningsList = () => {
  const [searchParams] = useSearchParams();

  const warningsQuery = useWarnings({
    page: +(searchParams.get('page') || 1),
  });

  if (warningsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const warnings = warningsQuery.data?.data;
  const meta = warningsQuery.data?.meta;

  if (!warnings) return null;

  return (
    <Table
      data={warnings}
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
            return <DeleteWarning id={id} />;
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
