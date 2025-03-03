import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const AboutRoute = () => {
  return (
    <PublicLayout title={t('about')}>
      <div>
        <p>
          Bienvenue survivants intrépides, plongez dans les terres désolées
          d&apos;EgoLand. Laissez-moi vous dire que cette expérience vous
          laissera sans voix. Ce serveur DayZ est bien plus qu&apos;un simple
          lieu de jeu, c&apos;est un monde vivant, vibrant et plein de surprises
          où le PVE, le PVP et même le RP (roleplayer) peuvent cohabiter en
          fonction de vos choix et faire évoluer EgoLand.
        </p>
        <p>
          Egoland rassemble des joueurs passionnés, des vétérans aguerris aux
          nouveaux arrivants. L&apos;atmosphère amicale et l&apos;entraide sont
          palpables.
        </p>
        <p>
          Pour un bon départ, un Gîte est prêt à vous ouvrir l&apos;une de ses
          chambres contre un loyer évidement et sous réserve de place
          disponible, le temps pour vous de voler de vos propres ailes.
        </p>
        <p>L&apos;aventure ne fait que commencer !</p>
        <h3>L&apos;immersion Totale :</h3>
        <p>
          Les zombies ont peut-être pris le contrôle, mais l&apos;esprit de
          survie règne toujours sur Egoland !
        </p>
        <p>
          Des missions captivantes qui vous feront gagner de la réputation et
          célébrité sur Egoland. Votre réputation compte pour permettre un accès
          à certains traders et missions. Vos actions et votre réputation
          déterminent comment les autres survivants vous perçoivent. Êtes-vous
          un héros altruiste ou un bandit impitoyable ? À vous de décider !
        </p>
        <p>
          Des créatures étranges des Hordes, des Mutants, des Boss, des Robots
          et des animaux sauvages ajoutent une couche d&apos;immersion profonde
          et de survie.
        </p>
        <p>
          Explorez les bunkers secrets et les lieux extraordinaires de
          Chernarus, où l&apos;aventure vous attend à chaque tournant. Des zones
          PVP palpitantes, une Safezone sécurisée, des commerçants variés, le
          fameux commissariat « Police d&apos;Egoland », un concessionnaire de
          luxe, un club animée, un gîte accueillant et bien d&apos;autres
          choses: chaque recoin de cette carte regorge de surprises, de défis à
          relever et de secrets à percer. Préparez-vous à une expérience
          inoubliable !
        </p>
        <p>A vous de faire fortune !</p>
        <p>
          Nombreux moyens sont mis en place sur Egoland, ATM, différents
          business, missions et Events vous permettront de vous enrichir sur le
          serveur afin de mieux vous équiper pour les missions extrêmes, de
          construire votre empire ou simplement survivre ! Vous pouvez ériger
          des forteresses imprenables pour protéger vos biens et vos camarades.
          La satisfaction de voir votre base grandir et votre business
          prospérer.
        </p>
        <h3>Lieux insolites d&apos;EgoLand :</h3>
        <p>
          EgoLand dispose d&apos;une SafeZone minutieusement cartographiée où
          vous pouvez vous reposer et échanger avec d&apos;autres survivants.
          Vous trouverez également hors de cette SafeZone des Traders tels que
          le Black Market, le Dealer, le Trader Hunting ainsi qu&apos;un Trader
          Zombies, autres traders à découvrir…
        </p>
        <h3>Le Gîte / Le Loup du Lac :</h3>
        <p>
          Les chambres d&apos;hôtes vous accueilleront. Composées d&apos;un
          nombre important de slots elles vous permettront de stocker librement
          et facilement vos trouvailles jusqu&apos;à votre départ.
        </p>
      </div>
    </PublicLayout>
  );
};

export default AboutRoute;
