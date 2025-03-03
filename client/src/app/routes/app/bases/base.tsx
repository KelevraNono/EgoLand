import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import { useBase, getBaseQueryOptions } from '@/features/bases/api/get-base';
import { BaseView } from '@/features/bases/components/base-view';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const baseId = params.baseId as string;

    const baseQuery = getBaseQueryOptions(baseId);

    const promises = [
      queryClient.getQueryData(baseQuery.queryKey) ??
        (await queryClient.fetchQuery(baseQuery)),
    ] as const;

    const [base] = await Promise.all(promises);

    return {
      base,
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
      </ContentLayout>
    </>
  );
};

export default BaseRoute;
