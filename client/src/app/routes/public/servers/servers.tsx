import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const ServersRoute = () => {
  return (
    <PublicLayout title={t('servers')}>
      <div>
        <h3>Nos serveurs DayZ – Explorez des cartes uniques</h3>
        <p>
          Bienvenue sur <strong>Egoland DayZ</strong>, où l’exploration, la
          survie et l’adrénaline sont au cœur de votre aventure. Nous proposons
          trois cartes distinctes pour satisfaire tous les styles de jeu :{' '}
          <strong>Chernarus, Deer Isle et Sahkal</strong>. Chacune offre des
          défis uniques et une immersion totale dans un monde post-apocalyptique
          impitoyable.
        </p>
        <h4>
          🌍 <a href="https://egoland.eu/chernarus/">Chernarus</a> – Le
          classique intemporel
        </h4>
        <p>
          🗺️ <strong>Superficie :</strong> 225 km²🌲{' '}
          <strong>Environnement :</strong> Régions rurales, forêts denses et
          zones urbaines abandonnées⚠️ <strong>Difficulté :</strong> Équilibrée
        </p>
        <p>
          Plongez dans <strong>Chernarus</strong>, la carte emblématique de
          DayZ. Inspirée des paysages post-soviétiques, elle propose une
          diversité de biomes allant de vastes plaines aux villes en ruines. Que
          vous exploriez les sommets de <strong>Green Mountain</strong>, les
          installations militaires de <strong>Tisy</strong>, ou les côtes de{' '}
          <strong>Elektrozavodsk</strong>, chaque zone recèle de précieuses
          ressources et des dangers imprévisibles.
        </p>
        <p>🔹 Points forts :</p>
        <ul>
          <li>Grande diversité de terrains et d’environnements</li>
          <li>Un équilibre parfait entre exploration, survie et combat</li>
          <li>
            Une carte idéale pour les nouveaux joueurs comme pour les vétérans
          </li>
        </ul>
        <h4>
          🏝️ <a href="https://egoland.eu/deer-isle/">Deer Isle</a> – L’île aux
          mystères
        </h4>
        <p>
          🗺️ <strong>Superficie :</strong> 16×16 km🌿{' '}
          <strong>Environnement :</strong> Archipel côtier avec forêts denses,
          villes abandonnées et grottes secrètes⚠️ <strong>Difficulté :</strong>{' '}
          Élevée
        </p>
        <p>
          <strong>Deer Isle</strong> est une île isolée qui met l’accent sur
          l’exploration et la découverte. Remplie de{' '}
          <strong>zones secrètes</strong>, de{' '}
          <strong>bunkers souterrains</strong> et d’un{' '}
          <strong>gameplay hardcore</strong>, cette carte pousse les survivants
          à repousser leurs limites. Préparez-vous à affronter un environnement
          impitoyable, où les ressources sont rares et les rencontres souvent
          dangereuses.
        </p>
        <p>🔹 Points forts :</p>
        <ul>
          <li>Zones cachées et bunkers à explorer</li>
          <li>
            Climat dynamique et changements de météo influençant le gameplay
          </li>
          <li>Un défi plus ardu pour les joueurs expérimentés</li>
        </ul>
        <h4>
          ❄️ <a href="https://egoland.eu/sakhal/">Sakhal</a> – La survie en
          milieu glacial
        </h4>
        <p>
          🗺️ <strong>Superficie :</strong> 83 km²🏔️{' '}
          <strong>Environnement :</strong> Île volcanique enneigée avec terrains
          montagneux⚠️ <strong>Difficulté :</strong> Extrême
        </p>
        <p>
          Bienvenue sur <strong>Sahkal</strong>, une carte issue de l’extension{' '}
          <em>DayZ: Frostline</em>, où le froid est votre ennemi numéro un. Dans
          cette région inspirée de la <strong>péninsule du Kamtchatka</strong>,
          les survivants doivent lutter contre les températures glaciales, la
          faune hostile et un relief escarpé. Chaque exploration devient une
          course contre la montre pour éviter l’hypothermie et trouver un refuge
          sûr.
        </p>
        <p>🔹 Points forts :</p>
        <ul>
          <li>Climat glacial exigeant une gestion de la température</li>
          <li>Nouveaux équipements adaptés à la survie en milieu extrême</li>
          <li>Zones volcaniques uniques et dangers environnementaux</li>
        </ul>
        <h4>🚀 Rejoignez nos serveurs !</h4>
        <p>
          Chacune de nos cartes propose une{' '}
          <strong>expérience unique et immersive</strong>. Que vous soyez un
          explorateur, un combattant ou un stratège, vous trouverez sur{' '}
          <strong>Egoland DayZ</strong> l’environnement qui correspond à votre
          style de jeu.
        </p>
        <p>
          🔗{' '}
          <strong>
            Connectez-vous dès maintenant et écrivez votre propre histoire de
            survie !
          </strong>
        </p>{' '}
      </div>
    </PublicLayout>
  );
};

export default ServersRoute;
