import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const DeerIsleRoute = () => {
  return (
    <PublicLayout title={t('deerisle')}>
      <p>
        Bienvenue sur la page dédiée à Deer Isle, une carte modifiée immersive
        pour le jeu DayZ. Plongez dans cet archipel mystérieux et découvrez les
        défis uniques qu’il réserve aux survivants.
      </p>
      <h3>Présentation de Deer Isle (en cours de développement) sur EgoLand</h3>
      <p>
        Deer Isle est une île fictive inspirée de la côte nord-est des
        États-Unis, offrant une superficie d’environ 16×16 km. Cette carte
        propose une variété de paysages, allant de denses forêts à des zones
        urbaines abandonnées, en passant par des installations industrielles et
        des sites mystérieux. Chaque recoin de l’île est conçu pour offrir une
        expérience de survie intense et immersive.
      </p>
      <h3>Points d’intérêt majeurs</h3>
      <ul>
        <li>
          Stonington : La principale ville de l’île, offrant de nombreuses
          structures à explorer, des ressources à collecter et des dangers
          potentiels à éviter.
        </li>
        <li>
          L’aéroport : Situé au nord de l’île, cet aéroport abandonné est un
          lieu stratégique pour trouver du matériel militaire, mais attention
          aux autres survivants qui convoitent également ces ressources.
        </li>
        <li>
          Le barrage : Une imposante structure offrant des opportunités
          d’exploration uniques et des points de vue panoramiques sur l’île.
        </li>
        <li>
          Les grottes : Deer Isle abrite plusieurs systèmes de grottes
          mystérieuses, renfermant des secrets et des défis pour les
          explorateurs courageux.
        </li>
      </ul>
      <h3>Cartographie de Deer Isle</h3>
      <p>
        Pour naviguer efficacement sur Deer Isle, il est essentiel de disposer
        d’une carte détaillée. Plusieurs ressources sont disponibles pour aider
        les joueurs à s’orienter :
      </p>
      <ul>
        <li>
          Carte interactive iZurvive : Cette carte en ligne offre une vue
          détaillée de Deer Isle, avec des marqueurs pour les points d’intérêt,
          les zones de butin et bien plus encore. Disponible sur iZurvive.
        </li>
        <li>
          Cartes communautaires : La communauté DayZ propose régulièrement des
          mises à jour et des cartes personnalisées de Deer Isle, disponibles
          sur des forums et des sites dédiés.
        </li>
      </ul>
      <h3>Conseils pour survivre sur Deer Isle</h3>
      <ul>
        <li>
          Exploration prudente : Deer Isle regorge de zones inexplorées et de
          dangers cachés. Prenez le temps de planifier vos déplacements et soyez
          toujours sur vos gardes.
        </li>
        <li>
          Gestion des ressources : La nourriture, l’eau et les fournitures
          médicales peuvent être rares. Priorisez la collecte de ces ressources
          et établissez des caches sécurisées.
        </li>
        <li>
          Interactions avec les autres survivants : Tous les joueurs ne sont pas
          hostiles, mais la méfiance est de mise. Évaluez chaque rencontre et
          décidez s’il est préférable de coopérer ou de garder vos distances.
        </li>
      </ul>
      <p>
        Préparez-vous à une aventure intense sur Deer Isle, où chaque décision
        peut déterminer votre survie. Explorez les mystères de l’île,
        adaptez-vous aux défis et écrivez votre propre histoire dans cet
        environnement impitoyable.
      </p>
    </PublicLayout>
  );
};

export default DeerIsleRoute;
