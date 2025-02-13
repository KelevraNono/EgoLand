import { useUsers } from '../api/get-users';

import { DeleteUser } from './delete-user';

import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

export const UsersList = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const users = usersQuery.data?.data;

  if (!users) return null;

  return (
    <Table
      data={users}
      columns={[
        {
          title: 'Prénom',
          field: 'firstName',
        },
        {
          title: 'Nom',
          field: 'lastName',
        },
        {
          title: 'Adresse e-mail',
          field: 'email',
        },
        {
          title: 'Rôle',
          field: 'role',
        },
        {
          title: 'Créé le',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteUser id={id} />;
          },
        },
      ]}
    />
  );
};
