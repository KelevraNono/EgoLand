import { t } from 'i18next';

import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';

const NotFoundRoute = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>{t('404notFound')}</h1>
      <p>{t('404notFoundMessage')}</p>
      <Link to={paths.public.landing.getHref()} replace>
        {t('comeBackHome')}
      </Link>
    </div>
  );
};

export default NotFoundRoute;
