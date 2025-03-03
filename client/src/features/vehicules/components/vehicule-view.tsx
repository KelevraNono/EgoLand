import { t } from 'i18next';

import { MDPreview } from '@/components/ui/md-preview';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/utils/format';

import { useVehicule } from '../api/get-vehicule';

import { UpdateVehicule } from './update-vehicule';

export const VehiculeView = ({ vehiculeId }: { vehiculeId: string }) => {
  const vehiculeQuery = useVehicule({
    vehiculeId,
  });

  if (vehiculeQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const vehicule = vehiculeQuery?.data?.data;

  if (!vehicule) return null;

  return (
    <div>
      <span className="text-xs font-bold">
        {formatDate(vehicule.createdAt)}
      </span>
      <div className="mt-6 flex flex-col space-y-16">
        <div className="flex justify-end">
          <UpdateVehicule vehiculeId={vehiculeId} />
        </div>
        <div>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-2xl text-sm">
                <MDPreview value={vehicule.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
