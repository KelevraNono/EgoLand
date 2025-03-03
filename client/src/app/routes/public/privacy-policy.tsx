import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const PrivacyPolicyRoute = () => {
  return (
    <PublicLayout title={t('privacypolicy')}>
      <div>
        <h3>🔒 Politique de Confidentialité – Egoland</h3>
        <p>Dernière mise à jour : 03/03/2025</p>
        <p>
          Chez <strong>Egoland</strong>, nous attachons une grande importance à
          la protection de vos données personnelles. Cette politique de
          confidentialité vous explique quelles informations nous collectons,
          comment nous les utilisons et quels sont vos droits concernant vos
          données.
        </p>
        <h4>📌 1. Informations collectées</h4>
        <p>
          Nous collectons différentes catégories de données afin d’assurer le
          bon fonctionnement de notre site et de nos services :
        </p>
        <ul>
          <li>
            <strong>Données d’identification</strong> : pseudonyme, adresse
            e-mail, identifiants de connexion.
          </li>
          <li>
            <strong>Données de navigation</strong> : adresse IP, type de
            navigateur, pages visitées, durée de connexion.
          </li>
          <li>
            <strong>Données de communication</strong> : messages échangés via
            notre plateforme ou notre support.
          </li>
          <li>
            <strong>Données liées au jeu</strong> : statistiques et interactions
            sur nos serveurs DayZ.
          </li>
        </ul>
        <h4>🎯 2. Utilisation des données</h4>
        <p>
          Vos informations sont utilisées uniquement dans le cadre suivant :
        </p>
        <ul>
          <li>
            ✅ Gestion de votre compte et de votre expérience sur Egoland.
          </li>
          <li>✅ Sécurisation et amélioration de nos services.</li>
          <li>
            ✅ Personnalisation de votre expérience de jeu et de navigation.
          </li>
          <li>
            ✅ Communication (notifications importantes, support, newsletters).
          </li>
          <li>
            ✅ Respect des obligations légales et lutte contre les comportements
            abusifs.
          </li>
        </ul>
        <p>
          Nous{' '}
          <strong>ne revendons ni ne partageons vos données à des tiers</strong>{' '}
          sans votre consentement, sauf obligation légale ou cas de sécurité.
        </p>
        <h4>🍪 3. Cookies et technologies de suivi</h4>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience sur le site
          :
        </p>
        <ul>
          <li>
            <strong>Cookies essentiels</strong> : permettent le bon
            fonctionnement du site.
          </li>
          <li>
            <strong>Cookies analytiques</strong> : aident à comprendre et
            améliorer l’utilisation du site.
          </li>
          <li>
            <strong>Cookies tiers</strong> : utilisés pour certains services
            externes (ex. statistiques, vidéos intégrées).
          </li>
        </ul>
        <p>
          Vous pouvez gérer vos préférences en matière de cookies via les
          paramètres de votre navigateur.
        </p>
        <h4>🔐 4. Sécurité et protection des données</h4>
        <p>
          Nous mettons en place des{' '}
          <strong>mesures de sécurité avancées</strong> pour protéger vos
          données contre toute perte, vol ou accès non autorisé. Toutefois,
          aucune technologie n’étant infaillible, nous vous recommandons
          d’utiliser des mots de passe forts et de ne jamais partager vos
          identifiants.
        </p>
        <h4>⚖️ 5. Vos droits</h4>
        <p>
          Vous disposez des droits suivants concernant vos données personnelles
          :
        </p>
        <ul>
          <li>
            <strong>Droit d’accès</strong> : consulter les données que nous
            détenons sur vous.
          </li>
          <li>
            <strong>Droit de rectification</strong> : corriger des informations
            incorrectes.
          </li>
          <li>
            <strong>Droit à l’effacement</strong> : demander la suppression de
            vos données (sous réserve de certaines obligations légales).
          </li>
          <li>
            <strong>Droit d’opposition</strong> : refuser certaines utilisations
            de vos données.
          </li>
          <li>
            <strong>Droit à la portabilité</strong> : récupérer vos données dans
            un format exploitable.
          </li>
        </ul>
        <p>
          Pour exercer vos droits, contactez-nous à{' '}
          <strong>[insérer contact email ou formulaire]</strong>.
        </p>
        <h4>📞 6. Contact</h4>
        <p>
          Pour toute question relative à notre politique de confidentialité,
          vous pouvez nous écrire à <strong>[insérer contact email]</strong> ou
          via notre formulaire en ligne.
        </p>
        <p>
          🔗{' '}
          <strong>
            En utilisant Egoland, vous acceptez cette politique de
            confidentialité.
          </strong>{' '}
          Nous nous réservons le droit de la mettre à jour en cas d’évolution de
          nos services ou de la législation en vigueur.
        </p>
      </div>
    </PublicLayout>
  );
};

export default PrivacyPolicyRoute;
