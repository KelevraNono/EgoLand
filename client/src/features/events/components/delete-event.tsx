import { t } from 'i18next';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteEvent } from '../api/delete-event';

type DeleteEventProps = {
  id: string;
};

export const DeleteEvent = ({ id }: DeleteEventProps) => {
  const { addNotification } = useNotifications();
  const deleteEventMutation = useDeleteEvent({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('eventDeleted'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title={t('deleteEvent')}
        body={t('sureWantDeleteEvent')}
        triggerButton={
          <Button variant="danger" icon={<Trash className="size-4" />}>
            {t('deleteEvent')}
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteEventMutation.isPending}
            type="button"
            variant="danger"
            onClick={() => deleteEventMutation.mutate({ eventId: id })}
          >
            {t('deleteEvent')}
          </Button>
        }
      />
    </Authorization>
  );
};
