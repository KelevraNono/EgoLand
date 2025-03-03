import { t } from 'i18next';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteVehicule } from '../api/delete-vehicule';

type DeleteVehiculeProps = {
  id: string;
};

export const DeleteVehicule = ({ id }: DeleteVehiculeProps) => {
  const { addNotification } = useNotifications();
  const deleteVehiculeMutation = useDeleteVehicule({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('vehiculeDeleted'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title={t('deleteVehicule')}
        body={t('sureWantDeleteVehicule')}
        triggerButton={
          <Button variant="danger" icon={<Trash className="size-4" />}>
            {t('deleteVehicule')}
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteVehiculeMutation.isPending}
            type="button"
            variant="danger"
            onClick={() => deleteVehiculeMutation.mutate({ vehiculeId: id })}
          >
            {t('deleteVehicule')}
          </Button>
        }
      />
    </Authorization>
  );
};
