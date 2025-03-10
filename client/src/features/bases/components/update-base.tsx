import { t } from 'i18next';
import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useBase } from '../api/get-base';
import { updateBaseInputSchema, useUpdateBase } from '../api/update-base';

type UpdateBaseProps = {
  baseId: string;
};

export const UpdateBase = ({ baseId }: UpdateBaseProps) => {
  const { addNotification } = useNotifications();
  const baseQuery = useBase({ baseId });
  const updateBaseMutation = useUpdateBase({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('baseEdited'),
        });
      },
    },
  });

  const base = baseQuery.data?.data;

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateBaseMutation.isSuccess}
        triggerButton={
          <Button icon={<Pen className="size-4" />} size="sm">
            {t('editBase')}
          </Button>
        }
        title={t('editBase')}
        submitButton={
          <Button
            form="update-base"
            type="submit"
            size="sm"
            isLoading={updateBaseMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="update-base"
          onSubmit={(values) => {
            updateBaseMutation.mutate({
              data: values,
              baseId,
            });
          }}
          options={{
            defaultValues: {
              title: base?.title ?? '',
              body: base?.body ?? '',
            },
          }}
          schema={updateBaseInputSchema}
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
