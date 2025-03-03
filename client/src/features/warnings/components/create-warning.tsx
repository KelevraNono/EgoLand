import { t } from 'i18next';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import {
  createWarningInputSchema,
  useCreateWarning,
} from '../api/create-warning';

export const CreateWarning = () => {
  const { addNotification } = useNotifications();
  const createWarningMutation = useCreateWarning({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('warningCreated'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createWarningMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            {t('createWarning')}
          </Button>
        }
        title={t('createWarning')}
        submitButton={
          <Button
            form="create-warning"
            type="submit"
            size="sm"
            isLoading={createWarningMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="create-warning"
          onSubmit={(values) => {
            createWarningMutation.mutate({ data: values });
          }}
          schema={createWarningInputSchema}
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
