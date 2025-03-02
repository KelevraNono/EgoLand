import { ReactNode } from 'react';

import banner from '@/assets/banner.jpg';

import { Head } from '../seo';

import { Footer } from './footer';
import { Header } from './header';

type PublicLayoutProps = {
  children: ReactNode;
  title: string;
};

export const PublicLayout = ({ children, title }: PublicLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="mx-auto max-w-7xl p-4">
        <Header />
      </div>
      <div
        style={{ backgroundImage: `url(${banner})` }}
        className="flex items-center justify-center min-h-[32em] bg-cover"
      >
        <h1 className="text-7xl font-bold">{title}</h1>
      </div>
      <div className="mx-auto max-w-7xl p-4">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};
