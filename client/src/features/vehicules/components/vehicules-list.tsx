import { t } from 'i18next';
import { useSearchParams } from 'react-router';

import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { useVehicules } from '../api/get-vehicules';

import { DeleteVehicule } from './delete-vehicule';

export const VehiculesList = () => {
  const [searchParams] = useSearchParams();

  const vehiculesQuery = useVehicules({
    page: +(searchParams.get('page') || 1),
  });

  if (vehiculesQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const vehicules = vehiculesQuery.data?.data;
  const meta = vehiculesQuery.data?.meta;

  if (!vehicules) return null;

  return (
    <Table
      data={vehicules}
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
            return <DeleteVehicule id={id} />;
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
