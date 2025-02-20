import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const ServersRoute = () => {
  return (
    <PublicLayout title={t('servers')}>
      <p>{t('servers')}</p>
    </PublicLayout>
  );
};

export default ServersRoute;
