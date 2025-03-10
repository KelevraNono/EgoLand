import { t } from 'i18next';
import { Trash } from 'lucide-react';

import { useDeleteDonation } from '../api/delete-donation';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

type DeleteDonationProps = {
  id: string;
};

export const DeleteDonation = ({ id }: DeleteDonationProps) => {
  const { addNotification } = useNotifications();
  const deleteDonationMutation = useDeleteDonation({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('donationDeleted'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title={t('deleteDonation')}
        body={t('sureWantDeleteDonation')}
        triggerButton={
          <Button variant="danger" icon={<Trash className="size-4" />}>
            {t('deleteDonation')}
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteDonationMutation.isPending}
            type="button"
            variant="danger"
            onClick={() => deleteDonationMutation.mutate({ donationId: id })}
          >
            {t('deleteDonation')}
          </Button>
        }
      />
    </Authorization>
  );
};
