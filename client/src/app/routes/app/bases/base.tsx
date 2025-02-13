import { QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams, LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import { useBase, getBaseQueryOptions } from '@/features/bases/api/get-base';
import { BaseView } from '@/features/bases/components/base-view';
import { getInfiniteCommentsQueryOptions } from '@/features/comments/api/get-comments';
import { Comments } from '@/features/comments/components/comments';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const baseId = params.baseId as string;

    const baseQuery = getBaseQueryOptions(baseId);
    const commentsQuery = getInfiniteCommentsQueryOptions(baseId);

    const promises = [
      queryClient.getQueryData(baseQuery.queryKey) ??
        (await queryClient.fetchQuery(baseQuery)),
      queryClient.getQueryData(commentsQuery.queryKey) ??
        (await queryClient.fetchInfiniteQuery(commentsQuery)),
    ] as const;

    const [base, comments] = await Promise.all(promises);

    return {
      base,
      comments,
    };
  };

const BaseRoute = () => {
  const params = useParams();
  const baseId = params.baseId as string;
  const baseQuery = useBase({
    baseId,
  });

  if (baseQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const base = baseQuery.data?.data;

  if (!base) return null;

  return (
    <>
      <ContentLayout title={base.title}>
        <BaseView baseId={baseId} />
        <div className="mt-8">
          <ErrorBoundary
            fallback={
              <div>Failed to load comments. Try to refresh the page.</div>
            }
          >
            <Comments baseId={baseId} />
          </ErrorBoundary>
        </div>
      </ContentLayout>
    </>
  );
};

export default BaseRoute;
