import { t } from 'i18next';

import { MDPreview } from '@/components/ui/md-preview';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/utils/format';

import { useBan } from '../api/get-ban';

import { UpdateBan } from './update-ban';

export const BanView = ({ banId }: { banId: string }) => {
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

  const ban = banQuery?.data?.data;

  if (!ban) return null;

  return (
    <div>
      <span className="text-xs font-bold">{formatDate(ban.createdAt)}</span>
      {ban.author && (
        <span className="ml-2 text-sm font-bold">
          {t('by')} {ban.author.firstName} {ban.author.lastName}
        </span>
      )}
      <div className="mt-6 flex flex-col space-y-16">
        <div className="flex justify-end">
          <UpdateBan banId={banId} />
        </div>
        <div>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-2xl text-sm">
                <MDPreview value={ban.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
