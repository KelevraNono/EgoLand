import { t } from 'i18next';
import { Trash } from 'lucide-react';

import { useDeleteComment } from '../api/delete-comment';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

type DeleteCommentProps = {
  id: string;
  discussionId: string;
};

export const DeleteComment = ({ id, discussionId }: DeleteCommentProps) => {
  const { addNotification } = useNotifications();
  const deleteCommentMutation = useDeleteComment({
    discussionId,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('commentDeleted'),
        });
      },
    },
  });

  return (
    <ConfirmationDialog
      isDone={deleteCommentMutation.isSuccess}
      icon="danger"
      title={t('deleteComment')}
      body={t('sureWantDeleteComment')}
      triggerButton={
        <Button
          variant="destructive"
          size="sm"
          icon={<Trash className="size-4" />}
        >
          {t('deleteComment')}
        </Button>
      }
      confirmButton={
        <Button
          isLoading={deleteCommentMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteCommentMutation.mutate({ commentId: id })}
        >
          {t('deleteComment')}
        </Button>
      }
    />
  );
};
