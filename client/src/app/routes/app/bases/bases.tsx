import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { getBasesQueryOptions } from '@/features/bases/api/get-bases';
import { BasesList } from '@/features/bases/components/bases-list';
import { CreateBase } from '@/features/bases/components/create-base';
import { getInfiniteCommentsQueryOptions } from '@/features/comments/api/get-comments';

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
  const queryClient = useQueryClient();
  return (
    <ContentLayout title="Bases">
      <div className="flex justify-end">
        <CreateBase />
      </div>
      <div className="mt-4">
        <BasesList
          onBasePrefetch={(id) => {
            // Prefetch the comments data when the user hovers over the link in the list
            queryClient.prefetchInfiniteQuery(
              getInfiniteCommentsQueryOptions(id),
            );
          }}
        />
      </div>
    </ContentLayout>
  );
};

export default BasesRoute;
