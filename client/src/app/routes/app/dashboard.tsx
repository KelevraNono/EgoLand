import { ContentLayout } from '@/components/layouts';
import { useUser } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';

const DashboardRoute = () => {
  const user = useUser();
  return (
    <ContentLayout title="Tableau de bord">
      <h1 className="text-xl">
        Bienvenu <b>{`${user.data?.firstName} ${user.data?.lastName}`}</b>
      </h1>
      <h4 className="my-3">
        Rôle : <b>{user.data?.role}</b>
      </h4>
      <p className="font-medium">Dans cette application vous pouvez :</p>
      {user.data?.role === ROLES.USER && (
        <ul className="my-4 list-inside list-disc">
          <li>Commenter des discussions</li>
          <li>Supprimer mes commentaires</li>
        </ul>
      )}
      {user.data?.role === ROLES.ADMIN && (
        <ul className="my-4 list-inside list-disc">
          <li>Créer des discussions</li>
          <li>Editer des discussions</li>
          <li>Supprimer des discussions</li>
          <li>Comenter des discussions</li>
          <li>Supprimer des commentaires</li>
        </ul>
      )}
    </ContentLayout>
  );
};

export default DashboardRoute;
