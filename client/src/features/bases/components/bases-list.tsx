import { t } from 'i18next';
import { useSearchParams } from 'react-router';

import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { useBases } from '../api/get-bases';

import { DeleteBase } from './delete-base';

export type BasesListProps = {
  onBasePrefetch?: (id: string) => void;
};

export const BasesList = () => {
  const [searchParams] = useSearchParams();

  const basesQuery = useBases({
    page: +(searchParams.get('page') || 1),
  });

  if (basesQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const bases = basesQuery.data?.data;
  const meta = basesQuery.data?.meta;

  if (!bases) return null;

  return (
    <Table
      data={bases}
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
            return <DeleteBase id={id} />;
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
