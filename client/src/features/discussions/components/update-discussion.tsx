import { Pen } from 'lucide-react';

import { useDiscussion } from '../api/get-discussion';
import {
  updateDiscussionInputSchema,
  useUpdateDiscussion,
} from '../api/update-discussion';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

type UpdateDiscussionProps = {
  discussionId: string;
};

export const UpdateDiscussion = ({ discussionId }: UpdateDiscussionProps) => {
  const { addNotification } = useNotifications();
  const discussionQuery = useDiscussion({ discussionId });
  const updateDiscussionMutation = useUpdateDiscussion({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Discussion éditée',
        });
      },
    },
  });

  const discussion = discussionQuery.data?.data;

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateDiscussionMutation.isSuccess}
        triggerButton={
          <Button icon={<Pen className="size-4" />} size="sm">
            Éditer discussion
          </Button>
        }
        title="Éditer discussion"
        submitButton={
          <Button
            form="update-discussion"
            type="submit"
            size="sm"
            isLoading={updateDiscussionMutation.isPending}
          >
            Enregistrer
          </Button>
        }
      >
        <Form
          id="update-discussion"
          onSubmit={(values) => {
            updateDiscussionMutation.mutate({
              data: values,
              discussionId,
            });
          }}
          options={{
            defaultValues: {
              title: discussion?.title ?? '',
              body: discussion?.body ?? '',
            },
          }}
          schema={updateDiscussionInputSchema}
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
