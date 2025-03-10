import { t } from 'i18next';
import { Pen } from 'lucide-react';

import { useDonation } from '../api/get-donation';
import {
  updateDonationInputSchema,
  useUpdateDonation,
} from '../api/update-donation';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

type UpdateDonationProps = {
  donationId: string;
};

export const UpdateDonation = ({ donationId }: UpdateDonationProps) => {
  const { addNotification } = useNotifications();
  const donationQuery = useDonation({ donationId });
  const updateDonationMutation = useUpdateDonation({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('donationEdited'),
        });
      },
    },
  });

  const donation = donationQuery.data?.data;

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateDonationMutation.isSuccess}
        triggerButton={
          <Button icon={<Pen className="size-4" />} size="sm">
            {t('editDonation')}
          </Button>
        }
        title={t('editDonation')}
        submitButton={
          <Button
            form="update-donation"
            type="submit"
            size="sm"
            isLoading={updateDonationMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="update-donation"
          onSubmit={(values) => {
            updateDonationMutation.mutate({
              data: values,
              donationId,
            });
          }}
          options={{
            defaultValues: {
              title: donation?.title ?? '',
              body: donation?.body ?? '',
            },
          }}
          schema={updateDonationInputSchema}
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
