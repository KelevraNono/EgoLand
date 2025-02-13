import { Head } from '@/components/seo';

const ServersRoute = () => {
  return (
    <>
      <Head description="Nos serveurs" title="Nos serveurs" />
      <div className="flex h-screen items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Nos serveurs</span>
          </h2>
          <p>Bienvenu sur nos serveurs</p>
        </div>
      </div>
    </>
  );
};

export default ServersRoute;
