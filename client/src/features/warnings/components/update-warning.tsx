import { t } from 'i18next';
import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useWarning } from '../api/get-warning';
import {
  updateWarningInputSchema,
  useUpdateWarning,
} from '../api/update-warning';

type UpdateWarningProps = {
  warningId: string;
};

export const UpdateWarning = ({ warningId }: UpdateWarningProps) => {
  const { addNotification } = useNotifications();
  const warningQuery = useWarning({ warningId });
  const updateWarningMutation = useUpdateWarning({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('warningEdited'),
        });
      },
    },
  });

  const warning = warningQuery.data?.data;

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateWarningMutation.isSuccess}
        triggerButton={
          <Button icon={<Pen className="size-4" />} size="sm">
            {t('editWarning')}
          </Button>
        }
        title={t('editWarning')}
        submitButton={
          <Button
            form="update-warning"
            type="submit"
            size="sm"
            isLoading={updateWarningMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="update-warning"
          onSubmit={(values) => {
            updateWarningMutation.mutate({
              data: values,
              warningId,
            });
          }}
          options={{
            defaultValues: {
              title: warning?.title ?? '',
              body: warning?.body ?? '',
            },
          }}
          schema={updateWarningInputSchema}
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
