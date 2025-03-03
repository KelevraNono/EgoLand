import { t } from 'i18next';
import { Copyright } from 'lucide-react';
import { ReactNode } from 'react';

import banner from '@/assets/banner.jpg';

import { Head } from '../seo';
import { Brush } from '../ui/svg/brush';

import { Footer } from './footer';
import { Header } from './header';

type PublicLayoutProps = {
  children: ReactNode;
  title: string;
  subTitle?: string;
};

export const PublicLayout = ({
  children,
  title,
  subTitle,
}: PublicLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="mx-auto max-w-7xl p-4">
        <Header />
      </div>
      <Brush color="primary" down={false} />
      <div
        style={{ backgroundImage: `url(${banner})` }}
        className="flex items-center justify-center min-h-[32em] bg-cover"
      >
        <h1>{title}</h1>
        {subTitle && <h2>{subTitle}</h2>}
      </div>
      <Brush color="secondary" up={false} />
      <div className="mx-auto max-w-7xl p-4">
        <main>{children}</main>
      </div>
      <Brush color="secondary" />
      <div className="mx-auto max-w-7xl p-4">
        <Footer />
      </div>
      <Brush color="primary" down={false} />
      <div className="flex items-center justify-center bg-primary min-h-[8em]">
        <p className="flex gap-4">
          <Copyright />
          {new Date().getFullYear()} {t('copyright')}
        </p>
      </div>
    </>
  );
};
