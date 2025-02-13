import { Plus } from 'lucide-react';

import {
  useCreateComment,
  createCommentInputSchema,
} from '../api/create-comment';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

type CreateCommentProps = {
  discussionId: string;
};

export const CreateComment = ({ discussionId }: CreateCommentProps) => {
  const { addNotification } = useNotifications();
  const createCommentMutation = useCreateComment({
    discussionId,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Commentaire créé',
        });
      },
    },
  });

  return (
    <FormDrawer
      isDone={createCommentMutation.isSuccess}
      triggerButton={
        <Button size="sm" icon={<Plus className="size-4" />}>
          Créer commentaire
        </Button>
      }
      title="Créer commentaire"
      submitButton={
        <Button
          isLoading={createCommentMutation.isPending}
          form="create-comment"
          type="submit"
          size="sm"
          disabled={createCommentMutation.isPending}
        >
          Enregistrer
        </Button>
      }
    >
      <Form
        id="create-comment"
        onSubmit={(values) => {
          createCommentMutation.mutate({
            data: values,
          });
        }}
        schema={createCommentInputSchema}
        options={{
          defaultValues: {
            body: '',
            discussionId: discussionId,
          },
        }}
      >
        {({ register, formState }) => (
          <Textarea
            label="Contenu"
            error={formState.errors['body']}
            registration={register('body')}
          />
        )}
      </Form>
    </FormDrawer>
  );
};
