import { t } from 'i18next';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';

import { useDeleteUser } from '../api/delete-user';

type DeleteUserProps = {
  id: string;
};

export const DeleteUser = ({ id }: DeleteUserProps) => {
  const user = useUser();
  const { addNotification } = useNotifications();
  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('userDeleted'),
        });
      },
    },
  });

  if (user.data?.id === id) return null;

  return (
    <ConfirmationDialog
      icon="danger"
      title={t('deleteUser')}
      body={t('sureWantDeleteUser')}
      triggerButton={<Button variant="danger">{t('delete')}</Button>}
      confirmButton={
        <Button
          isLoading={deleteUserMutation.isPending}
          type="button"
          variant="danger"
          onClick={() => deleteUserMutation.mutate({ userId: id })}
        >
          {t('deleteUser')}
        </Button>
      }
    />
  );
};
