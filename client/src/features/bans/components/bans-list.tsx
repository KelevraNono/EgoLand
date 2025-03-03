import { t } from 'i18next';
import { useSearchParams } from 'react-router';

import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { useBans } from '../api/get-bans';

import { DeleteBan } from './delete-ban';

export type BansListProps = {
  onBanPrefetch?: (id: string) => void;
};

export const BansList = () => {
  const [searchParams] = useSearchParams();

  const bansQuery = useBans({
    page: +(searchParams.get('page') || 1),
  });

  if (bansQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const bans = bansQuery.data?.data;
  const meta = bansQuery.data?.meta;

  if (!bans) return null;

  return (
    <Table
      data={bans}
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
            return <DeleteBan id={id} />;
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
