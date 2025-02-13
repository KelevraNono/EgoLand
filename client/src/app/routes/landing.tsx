import { useNavigate } from 'react-router';

import logo from '@/assets/logo.png';
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

  return (
    <>
      <Head description="Bienvenu EgoLand" />
      <div className="flex h-screen items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">EgoLand</span>
          </h2>
          <img src={logo} alt="react" />
          <p>Bienvenu sur EgoLand</p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Button onClick={handleStart}>Se connecter</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingRoute;
