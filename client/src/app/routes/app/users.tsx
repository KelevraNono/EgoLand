import { QueryClient } from '@tanstack/react-query';
import { t } from 'i18next';

import { ContentLayout } from '@/components/layouts';
import { getUsersQueryOptions } from '@/features/users/api/get-users';
import { UsersList } from '@/features/users/components/users-list';
import { Authorization, ROLES } from '@/lib/authorization';

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getUsersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const UsersRoute = () => {
  return (
    <ContentLayout title="Utilisateurs">
      <Authorization
        forbiddenFallback={<div>{t('onlyAdmins')}</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <UsersList />
      </Authorization>
    </ContentLayout>
  );
};

export default UsersRoute;
