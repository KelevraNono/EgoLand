import { t } from 'i18next';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import {
  createVehiculeInputSchema,
  useCreateVehicule,
} from '../api/create-vehicule';

export const CreateVehicule = () => {
  const { addNotification } = useNotifications();
  const createVehiculeMutation = useCreateVehicule({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('vehiculeCreated'),
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createVehiculeMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            {t('createVehicule')}
          </Button>
        }
        title={t('createVehicule')}
        submitButton={
          <Button
            form="create-vehicule"
            type="submit"
            size="sm"
            isLoading={createVehiculeMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="create-vehicule"
          onSubmit={(values) => {
            createVehiculeMutation.mutate({ data: values });
          }}
          schema={createVehiculeInputSchema}
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
