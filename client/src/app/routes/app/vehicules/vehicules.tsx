import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { getVehiculesQueryOptions } from '@/features/vehicules/api/get-vehicules';
import { CreateVehicule } from '@/features/vehicules/components/create-vehicule';
import { VehiculesList } from '@/features/vehicules/components/vehicules-list';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getVehiculesQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const VehiculesRoute = () => {
  return (
    <ContentLayout title="Vehicules">
      <div className="flex justify-end">
        <CreateVehicule />
      </div>
      <div className="mt-4">
        <VehiculesList />
      </div>
    </ContentLayout>
  );
};

export default VehiculesRoute;
