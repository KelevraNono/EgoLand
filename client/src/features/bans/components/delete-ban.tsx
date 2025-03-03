import { t } from 'i18next';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteBan } from '../api/delete-ban';

type DeleteBanProps = {
  id: string;
};

export const DeleteBan = ({ id }: DeleteBanProps) => {
  const { addNotification } = useNotifications();
  const deleteBanMutation = useDeleteBan({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('banDeleted'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title={t('deleteBan')}
        body={t('sureWantDeleteBan')}
        triggerButton={
          <Button variant="danger" icon={<Trash className="size-4" />}>
            {t('deleteBan')}
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteBanMutation.isPending}
            type="button"
            variant="danger"
            onClick={() => deleteBanMutation.mutate({ banId: id })}
          >
            {t('deleteBan')}
          </Button>
        }
      />
    </Authorization>
  );
};
