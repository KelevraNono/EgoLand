import { t } from 'i18next';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteWarning } from '../api/delete-warning';

type DeleteWarningProps = {
  id: string;
};

export const DeleteWarning = ({ id }: DeleteWarningProps) => {
  const { addNotification } = useNotifications();
  const deleteWarningMutation = useDeleteWarning({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('warningDeleted'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title={t('deleteWarning')}
        body={t('sureWantDeleteWarning')}
        triggerButton={
          <Button variant="danger" icon={<Trash className="size-4" />}>
            {t('deleteWarning')}
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteWarningMutation.isPending}
            type="button"
            variant="danger"
            onClick={() => deleteWarningMutation.mutate({ warningId: id })}
          >
            {t('deleteWarning')}
          </Button>
        }
      />
    </Authorization>
  );
};
