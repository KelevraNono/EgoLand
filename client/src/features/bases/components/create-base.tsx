import { t } from 'i18next';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { createBaseInputSchema, useCreateBase } from '../api/create-base';

export const CreateBase = () => {
  const { addNotification } = useNotifications();
  const createBaseMutation = useCreateBase({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('baseCreated'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createBaseMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            {t('createBase')}
          </Button>
        }
        title={t('createBase')}
        submitButton={
          <Button
            form="create-base"
            type="submit"
            size="sm"
            isLoading={createBaseMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="create-base"
          onSubmit={(values) => {
            createBaseMutation.mutate({ data: values });
          }}
          schema={createBaseInputSchema}
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
