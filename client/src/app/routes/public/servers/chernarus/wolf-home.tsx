import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const WolfHomeRoute = () => {
  return (
    <PublicLayout title={t('wolfHome')}>
      <div>
        <h3>Page en cours de développement</h3>
      </div>
    </PublicLayout>
  );
};

export default WolfHomeRoute;
