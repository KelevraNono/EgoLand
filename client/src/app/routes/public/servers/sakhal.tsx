import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const SakhalRoute = () => {
  return (
    <PublicLayout title={t('sakhal')}>
      <p>
        Bienvenue sur la page dédiée à Sakhal, la nouvelle carte immersive de
        l’extension DayZ: Frostline. Plongez dans cet archipel volcanique
        recouvert de neige, situé dans l’Extrême-Orient russe, et relevez les
        défis uniques qu’il propose aux survivants.
      </p>
      <h3>Présentation de Sakhal (fermé) sur EgoLand</h3>
      <p>
        Sakhal est un archipel fictif d’environ 83 km², inspiré de la péninsule
        du Kamtchatka en Russie. Ce territoire inhospitalier offre un
        environnement hivernal réaliste, avec des lacs gelés, des forêts
        enneigées et des montagnes imposantes. Les conditions climatiques
        extrêmes ajoutent une couche supplémentaire de difficulté pour les
        survivants, rendant la gestion de la chaleur corporelle et la recherche
        de ressources essentielles à la survie.
      </p>
      <h3>Environnement et défis</h3>
      <ul>
        <li>
          Climat rigoureux : Les températures glaciales de Sakhal obligent les
          survivants à trouver des vêtements chauds et à allumer des feux pour
          éviter l’hypothermie.
        </li>
        <li>
          Faune locale : L’archipel abrite de nouvelles espèces animales
          adaptées au froid, offrant des opportunités de chasse pour se nourrir,
          mais présentant également des dangers potentiels.
        </li>
        <li>
          Dangers volcaniques : En plus du froid, les survivants doivent être
          vigilants face aux risques environnementaux liés à l’activité
          volcanique de la région.
        </li>
      </ul>
      <h3>Ressources et équipements</h3>
      <ul>
        <li>
          Nouvelles mécaniques de jeu : L’extension Frostline introduit des
          maladies spécifiques au froid et revoit les mécanismes de pêche,
          reflétant les défis de la survie en milieu glacé.
        </li>
        <li>
          Équipements adaptés : Des vêtements hivernaux et des articles
          cosmétiques spécifiques permettent aux survivants de se protéger
          contre les intempéries tout en se fondant dans le paysage enneigé.
        </li>
      </ul>
      <h3>Conseils pour survivre à Sakhal</h3>
      <ul>
        <li>
          Gestion de la chaleur : Portez des couches de vêtements appropriées et
          allumez régulièrement des feux pour maintenir votre température
          corporelle.
        </li>
        <li>
          Recherche de nourriture : La chasse et la pêche sont essentielles,
          mais assurez-vous de cuire les aliments pour éviter les maladies.
        </li>
        <li>
          Vigilance environnementale : Restez attentif aux signes d’activité
          volcanique et évitez les zones à risque.
        </li>
      </ul>
      <p>
        Préparez-vous à une aventure intense dans l’archipel de Sakhal, où
        chaque décision peut être cruciale pour votre survie. Explorez,
        adaptez-vous et découvrez les secrets enfouis sous la neige de cette
        terre impitoyable.
      </p>
    </PublicLayout>
  );
};

export default SakhalRoute;
