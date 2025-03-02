import { t } from 'i18next';

import { ContentLayout } from '@/components/layouts';
import { useUser } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';

const DashboardRoute = () => {
  const user = useUser();
  return (
    <ContentLayout title="Tableau de bord">
      <h1 className="text-xl">
        {t('welcome')} <b>{`${user.data?.firstName} ${user.data?.lastName}`}</b>
      </h1>
      <h4 className="my-3">
        {t('role')} <b>{user.data?.role}</b>
      </h4>
      <p className="font-medium">{t('applicationDetail')}</p>
      {user.data?.role === ROLES.USER && (
        <ul className="my-4 list-inside list-disc">
          <li>{t('commentDiscussions')}</li>
          <li>{t('deleteOwnComments')}</li>
        </ul>
      )}
      {user.data?.role === ROLES.ADMIN && (
        <ul className="my-4 list-inside list-disc">
          <li>{t('createDiscussions')}</li>
          <li>{t('editDiscussions')}</li>
          <li>{t('deleteDiscussions')}</li>
          <li>{t('commentDiscussions')}</li>
          <li>{t('deleteComments')}</li>
        </ul>
      )}
    </ContentLayout>
  );
};

export default DashboardRoute;
