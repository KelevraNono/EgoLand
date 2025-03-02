import { ReactNode } from 'react';
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
      <div>
        <Header />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8">
          <div className="flex h-screen items-center bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">{title}</span>
              </h2>
              <hr />
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
