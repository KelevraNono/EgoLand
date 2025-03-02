import { t } from 'i18next';
import { useNavigate } from 'react-router';

import { Button } from '../ui/button';

import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

export const Header = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleStart = () => {
    if (user.data) {
      navigate(paths.app.dashboard.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  };

  const handleHome = () => {
    navigate(paths.public.landing.getHref());
  };

  const handleAbout = () => {
    navigate(paths.public.about.getHref());
  };

  const handleShop = () => {
    navigate(paths.public.shop.getHref());
  };

  const handleServers = () => {
    navigate(paths.public.servers.getHref());
  };

  return (
    <div className="py-6">
      <div className="mt-8 flex justify-center">
        <div className="inline-flex gap-1 rounded-md shadow">
          <Button onClick={handleHome}>{t('home')}</Button>
          <Button onClick={handleAbout}>{t('about')}</Button>
          <Button onClick={handleShop}>{t('shop')}</Button>
          <Button onClick={handleServers}>{t('servers')}</Button>
          <Button>{t('joinUs')}</Button>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-md shadow">
          <Button onClick={handleStart}>{t('login')}</Button>
        </div>
      </div>
    </div>
  );
};
