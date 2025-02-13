import { Plus } from 'lucide-react';

import {
  createDiscussionInputSchema,
  useCreateDiscussion,
} from '../api/create-discussion';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

export const CreateDiscussion = () => {
  const { addNotification } = useNotifications();
  const createDiscussionMutation = useCreateDiscussion({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Discussion créée',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createDiscussionMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            Créer discussion
          </Button>
        }
        title="Créer discussion"
        submitButton={
          <Button
            form="create-discussion"
            type="submit"
            size="sm"
            isLoading={createDiscussionMutation.isPending}
          >
            Enregistrer
          </Button>
        }
      >
        <Form
          id="create-discussion"
          onSubmit={(values) => {
            createDiscussionMutation.mutate({ data: values });
          }}
          schema={createDiscussionInputSchema}
        >
          {({ register, formState }) => (
            <>
              <Input
                label="Titre"
                error={formState.errors['title']}
                registration={register('title')}
              />

              <Textarea
                label="Contenu"
                error={formState.errors['body']}
                registration={register('body')}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
