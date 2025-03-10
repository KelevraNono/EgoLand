import { t } from 'i18next';
import { useSearchParams } from 'react-router';

import { useDonations } from '../api/get-donations';

import { DeleteDonation } from './delete-donation';

import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

export type DonationsListProps = {
  onDonationPrefetch?: (id: string) => void;
};

export const DonationsList = () => {
  const [searchParams] = useSearchParams();

  const donationsQuery = useDonations({
    page: +(searchParams.get('page') || 1),
  });

  if (donationsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const donations = donationsQuery.data?.data;
  const meta = donationsQuery.data?.meta;

  if (!donations) return null;

  return (
    <Table
      data={donations}
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
            return <DeleteDonation id={id} />;
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
