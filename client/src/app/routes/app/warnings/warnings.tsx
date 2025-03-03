import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { getWarningsQueryOptions } from '@/features/warnings/api/get-warnings';
import { CreateWarning } from '@/features/warnings/components/create-warning';
import { WarningsList } from '@/features/warnings/components/warnings-list';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getWarningsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const WarningsRoute = () => {
  return (
    <ContentLayout title="Warnings">
      <div className="flex justify-end">
        <CreateWarning />
      </div>
      <div className="mt-4">
        <WarningsList />
      </div>
    </ContentLayout>
  );
};

export default WarningsRoute;
