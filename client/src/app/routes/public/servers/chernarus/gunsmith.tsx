import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const GunsmithRoute = () => {
  return (
    <PublicLayout title={t('gunsmith')}>
      <div>
        <h3>Page en cours de développement</h3>
      </div>
    </PublicLayout>
  );
};

export default GunsmithRoute;
