import { Outlet, useNavigate } from 'react-router';

import { Head } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

const LandingRoute = () => {
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
    navigate(paths.home.root.getHref());
  };

  const handleAbout = () => {
    navigate(paths.home.about.getHref());
  };

  const handleShop = () => {
    navigate(paths.home.shop.getHref());
  };

  const handleServers = () => {
    navigate(paths.home.servers.getHref());
  };

  return (
    <>
      <Head description="Bienvenu EgoLand" />
      <div className="flex h-screen items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">EgoLand</span>
          </h2>
          <p>Bienvenu sur EgoLand</p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex gap-1 rounded-md shadow">
              <Button onClick={handleHome}>Accueil</Button>
              <Button onClick={handleAbout}>A propos</Button>
              <Button onClick={handleShop}>Boutique</Button>
              <Button onClick={handleServers}>Nos serveurs</Button>
              <Button>Nous rejoindre</Button>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Button onClick={handleStart}>Se connecter</Button>
            </div>
          </div>
          <p>Chernarus</p>
          <p>Deer Isle</p>
          <p>Sakhal</p>
          <p>Viens découvrir l'aventure avec nous !</p>
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
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LandingRoute;
