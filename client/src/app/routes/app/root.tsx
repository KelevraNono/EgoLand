import { t } from 'i18next';
import { Outlet } from 'react-router';

import { DashboardLayout } from '@/components/layouts';

export const ErrorBoundary = () => {
  return <div>{t('errorMessage')}</div>;
};

const AppRoot = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default AppRoot;
