import { Info, Home, Server, ShoppingCart, Bot } from 'lucide-react';
import { SVGProps } from 'react';
import { NavLink } from 'react-router';

import logo from '@/assets/logo.png';
import { paths } from '@/config/paths';
import { cn } from '@/utils/cn';

import { Button } from '../ui/button';
import { Link } from '../ui/link';

const Logo = () => {
  return (
    <Link
      className="flex items-center gap-1 text-white"
      to={paths.public.landing.getHref()}
    >
      <img className="h-14 w-auto" src={logo} alt="EgoLand" />
    </Link>
  );
};

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const Header = () => {
  const navigation = [
    { name: 'Accueil', to: paths.public.landing.getHref(), icon: Home },
    { name: 'A propos', to: paths.public.about.getHref(), icon: Info },
    { name: 'Boutique', to: paths.public.shop.getHref(), icon: ShoppingCart },
    { name: 'Serveurs', to: paths.public.servers.getHref(), icon: Server },
    ,
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <header className="flex flex-col sticky top-0 z-30 py-4 bg-black">
      <nav className="flex justify-between items-center">
        <div className="flex">
          <Logo />
        </div>
        <div className="flex gap-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'hover:bg-secondary',
                  'flex items-center rounded p-2 gap-4',
                  isActive && 'bg-primary',
                )
              }
            >
              <item.icon aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </div>
        <div>
          <Button icon={<Bot />}>Discord</Button>
        </div>
      </nav>
    </header>
  );
};
