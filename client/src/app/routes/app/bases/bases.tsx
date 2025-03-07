import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { getBasesQueryOptions } from '@/features/bases/api/get-bases';
import { BasesList } from '@/features/bases/components/bases-list';
import { CreateBase } from '@/features/bases/components/create-base';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getBasesQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const BasesRoute = () => {
  return (
    <ContentLayout title="Bases">
      <div className="flex justify-end">
        <CreateBase />
      </div>
      <div className="mt-4">
        <BasesList />
      </div>
    </ContentLayout>
  );
};

export default BasesRoute;
