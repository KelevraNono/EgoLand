import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const LandingRoute = () => {
  return (
    <PublicLayout title={t('home')}>
      <div>
        <p>{t('chernarus')}</p>
        <p>{t('deerisle')}</p>
        <p>{t('sakhal')}</p>
        <p>{t('catchline')}</p>
        <iframe
          width="600"
          height="350"
          src="https://www.youtube.com/embed/dab6lC2_kCM"
          title="Trailer Egoland"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </PublicLayout>
  );
};

export default LandingRoute;
