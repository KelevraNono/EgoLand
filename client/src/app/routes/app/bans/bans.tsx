import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { getBansQueryOptions } from '@/features/bans/api/get-bans';
import { BansList } from '@/features/bans/components/bans-list';
import { CreateBan } from '@/features/bans/components/create-ban';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getBansQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const BansRoute = () => {
  return (
    <ContentLayout title="Bans">
      <div className="flex justify-end">
        <CreateBan />
      </div>
      <div className="mt-4">
        <BansList />
      </div>
    </ContentLayout>
  );
};

export default BansRoute;
