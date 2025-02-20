import { t } from 'i18next';
import * as React from 'react';
import { useNavigate } from 'react-router';

import { Head } from '../seo';
import { Button } from '../ui/button';

import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

type PublicLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const PublicLayout = ({ children, title }: PublicLayoutProps) => {
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
    <>
      <Head title={title} />
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8">
          <div className="flex h-screen items-center bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">{title}</span>
              </h2>
              <p>{t('welcome')}</p>
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
              <hr />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
