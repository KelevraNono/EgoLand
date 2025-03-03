import { t } from 'i18next';
import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useBan } from '../api/get-ban';
import { updateBanInputSchema, useUpdateBan } from '../api/update-ban';

type UpdateBanProps = {
  banId: string;
};

export const UpdateBan = ({ banId }: UpdateBanProps) => {
  const { addNotification } = useNotifications();
  const banQuery = useBan({ banId });
  const updateBanMutation = useUpdateBan({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Ban éditée',
        });
      },
    },
  });

  const ban = banQuery.data?.data;

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateBanMutation.isSuccess}
        triggerButton={
          <Button icon={<Pen className="size-4" />} size="sm">
            {t('editBan')}
          </Button>
        }
        title={t('editBan')}
        submitButton={
          <Button
            form="update-ban"
            type="submit"
            size="sm"
            isLoading={updateBanMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="update-ban"
          onSubmit={(values) => {
            updateBanMutation.mutate({
              data: values,
              banId,
            });
          }}
          options={{
            defaultValues: {
              title: ban?.title ?? '',
              body: ban?.body ?? '',
            },
          }}
          schema={updateBanInputSchema}
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
