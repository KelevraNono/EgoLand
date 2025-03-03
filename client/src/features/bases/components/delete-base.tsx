import { t } from 'i18next';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteBase } from '../api/delete-base';

type DeleteBaseProps = {
  id: string;
};

export const DeleteBase = ({ id }: DeleteBaseProps) => {
  const { addNotification } = useNotifications();
  const deleteBaseMutation = useDeleteBase({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('baseDeleted'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title={t('deleteBase')}
        body={t('sureWantDeleteBase')}
        triggerButton={
          <Button variant="danger" icon={<Trash className="size-4" />}>
            {t('deleteBase')}
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteBaseMutation.isPending}
            type="button"
            variant="danger"
            onClick={() => deleteBaseMutation.mutate({ baseId: id })}
          >
            {t('deleteBase')}
          </Button>
        }
      />
    </Authorization>
  );
};
