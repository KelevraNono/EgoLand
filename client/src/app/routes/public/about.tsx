import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const AboutRoute = () => {
  return (
    <PublicLayout title={t('about')}>
      <p>{t('about')}</p>
    </PublicLayout>
  );
};

export default AboutRoute;
