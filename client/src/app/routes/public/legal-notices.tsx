import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';

const LegalNoticesRoute = () => {
  return (
    <PublicLayout title={t('legalNotices')}>
      <div>
        <h3>⚖️Mentions Légales – Egoland</h3>
        <p>Dernière mise à jour : 03/03/2025</p>
        <p>
          Conformément aux dispositions des articles 6-III et 19 de la loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l’Économie Numérique
          (LCEN), nous mettons à disposition des utilisateurs du site{' '}
          <strong>Egoland</strong> les présentes mentions légales.
        </p>
        <h4>📌 1. Informations générales</h4>
        <ul>
          <li>
            <strong>Nom du site</strong> : Egoland
          </li>
          <li>
            <strong>URL du site</strong> :{' '}
            <a href="https://egoland.eu/">https://egoland.eu</a>
          </li>
          <li>
            <strong>Responsable de publication</strong> : [Nom ou pseudonyme du
            responsable] – [Contact e-mail]
          </li>
          <li>
            <strong>Hébergeur du site</strong>: [Nom de l’hébergeur] – [Adresse]
            – [Contact]
          </li>
          <li>
            <strong>Propriété intellectuelle</strong> : Tous les contenus
            (textes, images, logos, éléments graphiques) sont la propriété
            exclusive d’Egoland, sauf mentions contraires. Toute reproduction
            est interdite sans autorisation préalable.
          </li>
        </ul>
        <h4>🛠️ 2. Conditions d’utilisation</h4>
        <p>
          L’utilisation du site Egoland implique l’acceptation pleine et entière
          des présentes conditions :
        </p>
        <ul>
          <li>
            ✅ L’utilisateur s’engage à utiliser le site et ses services dans le
            respect des lois en vigueur.
          </li>
          <li>
            ✅ Il est interdit d’utiliser le site pour des activités illégales,
            frauduleuses ou portant atteinte aux droits d’autrui.
          </li>
          <li>
            ✅ Egoland se réserve le droit de suspendre ou bannir tout
            utilisateur ne respectant pas ces règles.
          </li>
        </ul>
        <h4>🔐 3. Protection des données personnelles</h4>
        <p>
          Nous collectons certaines informations personnelles conformément à
          notre
          <strong>
            <a href="https://egoland.eu/politique-de-confidentialite/">
              Politique de confidentialité
            </a>
          </strong>
          .
        </p>
        <p>
          Conformément à la réglementation en vigueur (RGPD et Loi Informatique
          et Libertés), vous disposez d’un droit d’accès, de rectification et de
          suppression de vos données. Pour exercer ces droits, contactez-nous à
          <strong>[insérer contact e-mail]</strong>.
        </p>
        <h4>📜 4. Responsabilité</h4>
        <ul>
          <li>
            Egoland s’efforce de fournir des informations à jour et exactes,
            mais ne peut garantir l’absence totale d’erreurs ou d’omissions.
          </li>
          <li>
            Nous ne sommes pas responsables des interruptions de service, des
            failles de sécurité ou des éventuels dommages liés à l’utilisation
            du site.
          </li>
          <li>
            Les liens externes présents sur le site sont fournis à titre
            informatif. Egoland ne saurait être tenu responsable du contenu de
            ces sites tiers.
          </li>
        </ul>
        <h4>📞 5. Contact</h4>
        <p>
          Pour toute question ou réclamation concernant ces mentions légales,
          vous pouvez nous contacter :
        </p>
        <p>
          📧 <strong>E-mail</strong> : [insérer contact e-mail]
        </p>
        <p>
          📍 <strong>Adresse postale</strong> : [insérer adresse si applicable]
        </p>
        <p>
          🔗
          <strong>
            En accédant à Egoland, vous acceptez ces mentions légales.
          </strong>{' '}
          Celles-ci peuvent être mises à jour à tout moment, nous vous
          recommandons donc de les consulter régulièrement.
        </p>
      </div>
    </PublicLayout>
  );
};

export default LegalNoticesRoute;
