import { t } from 'i18next';
import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';

import {
  updateProfileInputSchema,
  useUpdateProfile,
} from '../api/update-profile';

export const UpdateProfile = () => {
  const user = useUser();
  const { addNotification } = useNotifications();
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('profileUpdated'),
        });
      },
    },
  });

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button icon={<Pen className="size-4" />} size="sm">
          {t('editProfil')}
        </Button>
      }
      title={t('editProfil')}
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isPending}
        >
          {t('save')}
        </Button>
      }
    >
      <Form
        id="update-profile"
        onSubmit={(values) => {
          updateProfileMutation.mutate({ data: values });
        }}
        options={{
          defaultValues: {
            firstName: user.data?.firstName ?? '',
            lastName: user.data?.lastName ?? '',
            email: user.data?.email ?? '',
            bio: user.data?.bio ?? '',
          },
        }}
        schema={updateProfileInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label={t('firstName')}
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <Input
              label={t('lastName')}
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <Input
              label={t('email')}
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
            />

            <Textarea
              label={t('bio')}
              error={formState.errors['bio']}
              registration={register('bio')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
