import { t } from 'i18next';
import {
  Snowflake,
  TreePalm,
  Trees,
  Cookie,
  Scale,
  Map,
  Bot,
} from 'lucide-react';
import { JSX, SVGProps } from 'react';
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
      <img className="h-28 w-auto" src={logo} alt="EgoLand" />
    </Link>
  );
};

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const Footer = () => {
  const navigation = [
    {
      name: 'Chernarus',
      to: paths.public.servers.chernarus.getHref(),
      icon: Trees,
    },
    {
      name: 'Politique de confidentialité',
      to: paths.public['privacy-policy'].getHref(),
      icon: Cookie,
    },
    {
      name: 'Deer Isle',
      to: paths.public.servers['deer-isle'].getHref(),
      icon: TreePalm,
    },
    {
      name: 'Mentions légales',
      to: paths.public['legal-notices'].getHref(),
      icon: Scale,
    },
    {
      name: 'Sakhal',
      to: paths.public.servers.sakhal.getHref(),
      icon: Snowflake,
    },
    {
      name: 'Plan du site',
      to: paths.public.sitemap.getHref(),
      icon: Map,
    },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <footer>
      <nav className="flex justify-between items-center">
        <div className="flex">
          <Logo />
        </div>
        <div>
          <h5>Liens utiles</h5>
          <div className="grid grid-cols-2">
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
        </div>
        <div>
          <Button icon={<Bot />} onClick={() => {}}>
            {t('discord')}
          </Button>
        </div>
      </nav>
    </footer>
  );
};
