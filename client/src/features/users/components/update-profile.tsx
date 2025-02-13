import { Pen } from 'lucide-react';

import {
  updateProfileInputSchema,
  useUpdateProfile,
} from '../api/update-profile';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';

export const UpdateProfile = () => {
  const user = useUser();
  const { addNotification } = useNotifications();
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Updated',
        });
      },
    },
  });

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button icon={<Pen className="size-4" />} size="sm">
          Éditer le profil
        </Button>
      }
      title="Éditer le profil"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isPending}
        >
          Enregistrer
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
              label="Prénom"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <Input
              label="Nom"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <Input
              label="Adresse e-mail"
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
            />

            <Textarea
              label="Bio"
              error={formState.errors['bio']}
              registration={register('bio')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
