import { Trash } from 'lucide-react';

import { useDeleteDiscussion } from '../api/delete-discussion';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

type DeleteDiscussionProps = {
  id: string;
};

export const DeleteDiscussion = ({ id }: DeleteDiscussionProps) => {
  const { addNotification } = useNotifications();
  const deleteDiscussionMutation = useDeleteDiscussion({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Discussion supprimé',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Supprimer discussion"
        body="Voulez-vous vraiment supprimer cette discussion?"
        triggerButton={
          <Button variant="destructive" icon={<Trash className="size-4" />}>
            Supprimer discussion
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteDiscussionMutation.isPending}
            type="button"
            variant="destructive"
            onClick={() =>
              deleteDiscussionMutation.mutate({ discussionId: id })
            }
          >
            Supprimer discussion
          </Button>
        }
      />
    </Authorization>
  );
};
