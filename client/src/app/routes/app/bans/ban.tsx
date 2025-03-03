import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import { useBan, getBanQueryOptions } from '@/features/bans/api/get-ban';
import { BanView } from '@/features/bans/components/ban-view';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const banId = params.banId as string;

    const banQuery = getBanQueryOptions(banId);

    const promises = [
      queryClient.getQueryData(banQuery.queryKey) ??
        (await queryClient.fetchQuery(banQuery)),
    ] as const;

    const [ban] = await Promise.all(promises);

    return {
      ban,
    };
  };

const BanRoute = () => {
  const params = useParams();
  const banId = params.banId as string;
  const banQuery = useBan({
    banId,
  });

  if (banQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const ban = banQuery.data?.data;

  if (!ban) return null;

  return (
    <>
      <ContentLayout title={ban.title}>
        <BanView banId={banId} />
      </ContentLayout>
    </>
  );
};

export default BanRoute;
