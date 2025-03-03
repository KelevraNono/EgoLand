import { t } from 'i18next';
import { Snowflake, TreePalm, Trees } from 'lucide-react';
import { NavLink } from 'react-router';

import { PublicLayout } from '@/components/layouts/public-layout';
import { paths } from '@/config/paths';
import { cn } from '@/utils/cn';

const LandingRoute = () => {
  const cards = [
    {
      id: 1,
      title: t('chernarus'),
      subTitle: 'PvP/PvE/Semi RP',
      content:
        'Chernarus est une région côtière variée, composée de villes abandonnées, de villages ruraux, de forêts denses et de montagnes escarpées. Chaque zone recèle des secrets, des ressources précieuses et des dangers potentiels. Les survivants doivent explorer cet environnement hostile pour trouver de la nourriture, des armes et des abris, tout en évitant les menaces omniprésentes.',
      path: paths.public.servers.chernarus.getHref(),
      icon: Trees,
    },
    {
      id: 2,
      title: t('deerisle'),
      subTitle: 'PvE/PvP/Hardcore',
      content:
        'Deer Isle est une île fictive inspirée de la côte nord-est des États-Unis, offrant une superficie d’environ 16×16 km. Cette carte propose une variété de paysages, allant de denses forêts à des zones urbaines abandonnées, en passant par des installations industrielles et des sites mystérieux. Chaque recoin de l’île est conçu pour offrir une expérience de survie intense et immersive.',
      path: paths.public.servers['deer-isle'].getHref(),
      icon: TreePalm,
    },
    {
      id: 3,
      title: t('sakhal'),
      subTitle: 'Full PvP',
      content:
        'Sakhal est un archipel fictif d’environ 83 km², inspiré de la péninsule du Kamtchatka en Russie. Ce territoire inhospitalier offre un environnement hivernal réaliste, avec des lacs gelés, des forêts enneigées et des montagnes imposantes. Les conditions climatiques extrêmes ajoutent une couche supplémentaire de difficulté pour les survivants, rendant la gestion de la chaleur corporelle et la recherche de ressources essentielles à la survie.',
      path: paths.public.servers.sakhal.getHref(),
      icon: Snowflake,
    },
  ];

  return (
    <PublicLayout title={t('home')}>
      <div>
        <div className="grid grid-cols-3 gap-4">
          {cards.map((c) => {
            return (
              <div key={c.id}>
                <h3>{c.title}</h3>
                <h4>{c.subTitle}</h4>
                <p>{c.content}</p>
                <NavLink to={c.path} className="flex gap-4">
                  <c.icon
                    className={cn('mr-4 size-6 shrink-0')}
                    aria-hidden="true"
                  />
                  Plus d&apos;info
                </NavLink>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4>{t('catchline')}</h4>
            <p>Découvre notre trailer !</p>
          </div>
          <div>
            <iframe
              width="600"
              height="350"
              src="https://www.youtube.com/embed/dab6lC2_kCM"
              title="Trailer Egoland"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LandingRoute;
