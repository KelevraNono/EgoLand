import { PublicLayout } from '@/components/layouts/public-layout';

const LandingRoute = () => {
  return (
    <PublicLayout title="Accueil">
      <div>
        <p>Chernarus</p>
        <p>Deer Isle</p>
        <p>Sakhal</p>
        <p>Viens découvrir l'aventure avec nous !</p>
        <iframe
          width="600"
          height="350"
          src="https://www.youtube.com/embed/dab6lC2_kCM"
          title="Trailer Egoland"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </PublicLayout>
  );
};

export default LandingRoute;
