import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';

const NotFoundRoute = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - pas trouvé</h1>
      <p>Désolé, la page que vous recherchez n'éxiste pas.</p>
      <Link to={paths.home.getHref()} replace>
        Revenir à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundRoute;
