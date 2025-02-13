import { Head } from '@/components/seo';

const LandingRoute = () => {
  return (
    <>
      <Head description="Boutique" title="Boutique" />
      <div className="flex h-screen items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Boutique</span>
          </h2>
          <p>Bienvenu sur la boutique</p>
        </div>
      </div>
    </>
  );
};

export default LandingRoute;
