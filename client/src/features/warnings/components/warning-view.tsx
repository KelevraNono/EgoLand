import { MDPreview } from '@/components/ui/md-preview';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/utils/format';

import { useWarning } from '../api/get-warning';

import { UpdateWarning } from './update-warning';

export const WarningView = ({ warningId }: { warningId: string }) => {
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

  const warning = warningQuery?.data?.data;

  if (!warning) return null;

  return (
    <div>
      <span className="text-xs font-bold">{formatDate(warning.createdAt)}</span>
      <div className="mt-6 flex flex-col space-y-16">
        <div className="flex justify-end">
          <UpdateWarning warningId={warningId} />
        </div>
        <div>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-2xl text-sm">
                <MDPreview value={warning.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
