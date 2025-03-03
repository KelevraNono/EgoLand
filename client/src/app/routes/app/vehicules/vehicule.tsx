import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import {
  useVehicule,
  getVehiculeQueryOptions,
} from '@/features/vehicules/api/get-vehicule';
import { VehiculeView } from '@/features/vehicules/components/vehicule-view';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const vehiculeId = params.vehiculeId as string;

    const vehiculeQuery = getVehiculeQueryOptions(vehiculeId);

    const promises = [
      queryClient.getQueryData(vehiculeQuery.queryKey) ??
        (await queryClient.fetchQuery(vehiculeQuery)),
    ] as const;

    const [vehicule] = await Promise.all(promises);

    return {
      vehicule,
    };
  };

const VehiculeRoute = () => {
  const params = useParams();
  const vehiculeId = params.vehiculeId as string;
  const vehiculeQuery = useVehicule({
    vehiculeId,
  });

  if (vehiculeQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const vehicule = vehiculeQuery.data?.data;

  if (!vehicule) return null;

  return (
    <>
      <ContentLayout title={vehicule.title}>
        <VehiculeView vehiculeId={vehiculeId} />
      </ContentLayout>
    </>
  );
};

export default VehiculeRoute;
