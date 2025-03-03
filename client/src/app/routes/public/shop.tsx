import { t } from 'i18next';

import { PublicLayout } from '@/components/layouts/public-layout';
import { formatCurrency } from '@/utils/format';

const ShopRoute = () => {
  const packs = [
    {
      number: 1,
      price: 10,
      content: (
        <ul>
          <li>1 tenue MMG Custom</li>
          <li>Grade VIP Discord</li>
          <li>
            Possibilité de reskin 𝟭 𝗚𝗹𝗼𝗰𝗸 𝗘𝗧 𝟭 𝗙𝗶𝘃𝗲𝗦𝗲𝘃𝗲𝗻 𝗰𝘂𝘀𝘁𝗼𝗺 𝗮𝘃𝗲𝗰 𝟮 𝗰𝗵𝗮𝗿𝗴𝗲𝘂𝗿𝘀
          </li>
          <li>Custom = reskin</li>
        </ul>
      ),
    },
    {
      number: 2,
      price: 20,
      content: (
        <ul>
          <li>1 tenue MMG Custom</li>
          <li>Grade VIP in-game &amp; Discord</li>
          <li>
            Possibilité de reskin 𝟭 𝗙𝗶𝘃𝗲𝗦𝗲𝘃𝗲𝗻 𝗘𝗧 𝟭 𝗧𝗲𝗰 𝟵 𝗰𝘂𝘀𝘁𝗼𝗺 𝗮𝘃𝗲𝗰 𝟮 𝗰𝗵𝗮𝗿𝗴𝗲𝘂𝗿𝘀
          </li>
          <li>File prioritaire</li>
          <li>Custom = reskin</li>
        </ul>
      ),
    },
    {
      number: 3,
      price: 30,
      content: (
        <ul>
          <li>2 tenues MMG Custom</li>
          <li>Grade VIP in-game &amp; Discord</li>
          <li>
            Possibilité de reskin 𝟭 𝗙𝗶𝘃𝗲𝗦𝗲𝘃𝗲𝗻 + 𝟭 𝗠𝗣𝟳 𝗘𝗧 𝟭 𝗩𝗲𝗰𝘁𝗼𝗿 𝗰𝘂𝘀𝘁𝗼𝗺 𝗮𝘃𝗲𝗰 𝟮
            𝗰𝗵𝗮𝗿𝗴𝗲𝘂𝗿𝘀
          </li>
          <li>File prioritaire</li>
          <li>custom = reskin</li>
        </ul>
      ),
    },
    {
      number: 4,
      price: 40,
      content: (
        <ul>
          <li>2 tenues MMG Custom</li>
          <li>Grade VIP in-game &amp; Discord</li>
          <li>
            Possibilité de reskin 𝟭 𝗙𝗶𝘃𝗲𝗦𝗲𝘃𝗲𝗻 + 𝟭 𝗔𝗔𝟭𝟮 + 𝟭 𝗠𝗣𝟳 + 𝟭 𝗩𝗲𝗰𝘁𝗼𝗿 𝗰𝘂𝘀𝘁𝗼𝗺
            𝗮𝘃𝗲𝗰 𝟮 𝗰𝗵𝗮𝗿𝗴𝗲𝘂𝗿𝘀
          </li>
          <li>File prioritaire</li>
          <li>Custom = reskin</li>
        </ul>
      ),
    },
    {
      number: 5,
      price: 50,
      content: (
        <ul>
          <li>2 tenues MMG Custom</li>
          <li>Grade VIP in-game &amp; Discord</li>
          <li>
            Possibilité de reskin 𝟭 𝗙𝗶𝘃𝗲𝗦𝗲𝘃𝗲𝗻 + 𝟭 𝗔𝗔𝟭𝟮 + 𝟭 𝗠𝗣𝟳 + 𝟭 𝗩𝗲𝗰𝘁𝗼𝗿 + 𝟭
            𝗧𝗮𝗿𝟮𝟭 + 𝟭 𝗠𝟮𝟰 𝗰𝘂𝘀𝘁𝗼𝗺 𝗮𝘃𝗲𝗰 𝟮 𝗰𝗵𝗮𝗿𝗴𝗲𝘂𝗿𝘀
          </li>
          <li>File prioritaire</li>
          <li>Custom = reskin</li>
        </ul>
      ),
    },
    {
      number: 6,
      price: 100,
      content: (
        <ul>
          <li>4 tenues MMG Custom</li>
          <li>Grade VIP in-game &amp; Discord</li>
          <li>
            Possibilité de reskin 𝟭 𝗮𝗿𝗺𝗲 𝗰𝘂𝘀𝘁𝗼𝗺 𝗱𝗲 𝗰𝗵𝗮𝗾𝘂𝗲 𝗮𝘂 𝗰𝗵𝗼𝗶𝘅 + 𝟮 𝗰𝗵𝗮𝗿𝗴𝗲𝘂𝗿𝘀
            𝗱𝗲 𝗰𝗵𝗮𝗾𝘂𝗲 𝗮𝗿𝗺𝗲
          </li>
          <li>File prioritaire</li>
          <li>Custom = reskin</li>
        </ul>
      ),
    },
  ];

  return (
    <PublicLayout title={t('shop')}>
      <div>
        <h3>Donations et Privilèges</h3>
        <p>
          Il est essentiel de souligner que les donations ne confèrent pas des
          privilèges spécifiques via le staff. Les privilèges accordés aux
          donateurs donnent un accès anticipé à certaines fonctionnalités, des
          cosmétiques exclusifs, etc.
        </p>
        <h3>Objectif des Donations</h3>
        <p>
          Les donations ont pour but de faire avancer le serveur. Elles
          permettent d&apos;investir dans des améliorations, des achats de mods,
          des frais d&apos;hébergement, etc.
        </p>
        <h3>Irrévocabilité des Dons</h3>
        <p>
          Conformément à l&apos;Article 894 du code civil, un don est
          irrévocable. Une fois qu&apos;un joueur a fait une donation, il ne
          peut pas demander de remboursement, quelle que soit la raison. Il est
          donc essentiel que les joueurs comprennent bien cette règle avant de
          faire une donation.
        </p>
        <h3>Conditions d&apos;âge</h3>
        <p>
          Pour faire une donation, vous devez être majeur conformément à la loi
          en vigueur.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {packs.map((p) => {
          return (
            <div key={p.number}>
              <div>
                <h4>Pack N°{p.number} </h4>
              </div>
              <div>
                <p>{formatCurrency(p.price)}</p>
              </div>
              <div>{p.content}</div>
              <div>
                <a href="https://discord.gg/Z4vc6uuWZp">Ouvre ton ticket</a>
              </div>
            </div>
          );
        })}
      </div>
    </PublicLayout>
  );
};

export default ShopRoute;
