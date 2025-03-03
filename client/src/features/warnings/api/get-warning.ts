import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Warning } from '@/types/api';

export const getWarning = ({
  warningId,
}: {
  warningId: string;
}): Promise<{ data: Warning }> => {
  return api.get(`/warnings/${warningId}`);
};

export const getWarningQueryOptions = (warningId: string) => {
  return queryOptions({
    queryKey: ['warnings', warningId],
    queryFn: () => getWarning({ warningId }),
  });
};

type UseWarningOptions = {
  warningId: string;
  queryConfig?: QueryConfig<typeof getWarningQueryOptions>;
};

export const useWarning = ({ warningId, queryConfig }: UseWarningOptions) => {
  return useQuery({
    ...getWarningQueryOptions(warningId),
    ...queryConfig,
  });
};
