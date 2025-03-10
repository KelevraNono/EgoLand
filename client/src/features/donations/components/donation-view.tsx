import { useDonation } from '../api/get-donation';

import { UpdateDonation } from './update-donation';

import { MDPreview } from '@/components/ui/md-preview';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/utils/format';

export const DonationView = ({ donationId }: { donationId: string }) => {
  const donationQuery = useDonation({
    donationId,
  });

  if (donationQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const donation = donationQuery?.data?.data;

  if (!donation) return null;

  return (
    <div>
      <span className="text-xs font-bold">
        {formatDate(donation.createdAt)}
      </span>
      <div className="mt-6 flex flex-col space-y-16">
        <div className="flex justify-end">
          <UpdateDonation donationId={donationId} />
        </div>
        <div>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-2xl text-sm">
                <MDPreview value={donation.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
