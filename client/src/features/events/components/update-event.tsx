import { t } from 'i18next';
import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useEvent } from '../api/get-event';
import { updateEventInputSchema, useUpdateEvent } from '../api/update-event';

type UpdateEventProps = {
  eventId: string;
};

export const UpdateEvent = ({ eventId }: UpdateEventProps) => {
  const { addNotification } = useNotifications();
  const eventQuery = useEvent({ eventId });
  const updateEventMutation = useUpdateEvent({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Event éditée',
        });
      },
    },
  });

  const event = eventQuery.data?.data;

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateEventMutation.isSuccess}
        triggerButton={
          <Button icon={<Pen className="size-4" />} size="sm">
            {t('editEvent')}
          </Button>
        }
        title={t('editEvent')}
        submitButton={
          <Button
            form="update-event"
            type="submit"
            size="sm"
            isLoading={updateEventMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="update-event"
          onSubmit={(values) => {
            updateEventMutation.mutate({
              data: values,
              eventId,
            });
          }}
          options={{
            defaultValues: {
              title: event?.title ?? '',
              body: event?.body ?? '',
            },
          }}
          schema={updateEventInputSchema}
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
