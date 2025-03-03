import { t } from 'i18next';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { createBanInputSchema, useCreateBan } from '../api/create-ban';

export const CreateBan = () => {
  const { addNotification } = useNotifications();
  const createBanMutation = useCreateBan({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('banCreated'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createBanMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            {t('createBan')}
          </Button>
        }
        title={t('createBan')}
        submitButton={
          <Button
            form="create-ban"
            type="submit"
            size="sm"
            isLoading={createBanMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="create-ban"
          onSubmit={(values) => {
            createBanMutation.mutate({ data: values });
          }}
          schema={createBanInputSchema}
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
