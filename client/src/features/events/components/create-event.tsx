import { t } from 'i18next';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { createEventInputSchema, useCreateEvent } from '../api/create-event';

export const CreateEvent = () => {
  const { addNotification } = useNotifications();
  const createEventMutation = useCreateEvent({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('eventCreated'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createEventMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            {t('createEvent')}
          </Button>
        }
        title={t('createEvent')}
        submitButton={
          <Button
            form="create-event"
            type="submit"
            size="sm"
            isLoading={createEventMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="create-event"
          onSubmit={(values) => {
            createEventMutation.mutate({ data: values });
          }}
          schema={createEventInputSchema}
        >
          {({ register, formState }) => (
            <>
              <Input
                label={t('title')}
                error={formState.errors['title']}
                registration={register('title')}
              />

              <Textarea
                label={t('content')}
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
