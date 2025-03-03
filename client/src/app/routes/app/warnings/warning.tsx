import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import {
  useWarning,
  getWarningQueryOptions,
} from '@/features/warnings/api/get-warning';
import { WarningView } from '@/features/warnings/components/warning-view';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const warningId = params.warningId as string;

    const warningQuery = getWarningQueryOptions(warningId);

    const promises = [
      queryClient.getQueryData(warningQuery.queryKey) ??
        (await queryClient.fetchQuery(warningQuery)),
    ] as const;

    const [warning] = await Promise.all(promises);

    return {
      warning,
    };
  };

const WarningRoute = () => {
  const params = useParams();
  const warningId = params.warningId as string;
  const warningQuery = useWarning({
    warningId,
  });

  if (warningQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const warning = warningQuery.data?.data;

  if (!warning) return null;

  return (
    <>
      <ContentLayout title={warning.title}>
        <WarningView warningId={warningId} />
      </ContentLayout>
    </>
  );
};

export default WarningRoute;
