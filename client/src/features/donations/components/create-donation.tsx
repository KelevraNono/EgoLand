import { t } from 'i18next';
import { Plus } from 'lucide-react';

import {
  createDonationInputSchema,
  useCreateDonation,
} from '../api/create-donation';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

export const CreateDonation = () => {
  const { addNotification } = useNotifications();
  const createDonationMutation = useCreateDonation({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('donationCreated'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createDonationMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            {t('createDonation')}
          </Button>
        }
        title={t('createDonation')}
        submitButton={
          <Button
            form="create-donation"
            type="submit"
            size="sm"
            isLoading={createDonationMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="create-donation"
          onSubmit={(values) => {
            createDonationMutation.mutate({ data: values });
          }}
          schema={createDonationInputSchema}
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
