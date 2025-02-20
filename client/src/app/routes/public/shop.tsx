import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const ShopRoute = () => {
  return (
    <PublicLayout title={t('shop')}>
      <p>{t('servers')}</p>
    </PublicLayout>
  );
};

export default ShopRoute;
