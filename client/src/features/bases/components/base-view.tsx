import { MDPreview } from '@/components/ui/md-preview';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/utils/format';

import { useBase } from '../api/get-base';

import { UpdateBase } from './update-base';

export const BaseView = ({ baseId }: { baseId: string }) => {
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

  const base = baseQuery?.data?.data;

  if (!base) return null;

  return (
    <div>
      <span className="text-xs font-bold">{formatDate(base.createdAt)}</span>
      <div className="mt-6 flex flex-col space-y-16">
        <div className="flex justify-end">
          <UpdateBase baseId={baseId} />
        </div>
        <div>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-2xl text-sm">
                <MDPreview value={base.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
