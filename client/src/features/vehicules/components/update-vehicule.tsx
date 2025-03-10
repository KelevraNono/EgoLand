import { t } from 'i18next';
import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useVehicule } from '../api/get-vehicule';
import {
  updateVehiculeInputSchema,
  useUpdateVehicule,
} from '../api/update-vehicule';

type UpdateVehiculeProps = {
  vehiculeId: string;
};

export const UpdateVehicule = ({ vehiculeId }: UpdateVehiculeProps) => {
  const { addNotification } = useNotifications();
  const vehiculeQuery = useVehicule({ vehiculeId });
  const updateVehiculeMutation = useUpdateVehicule({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: t('vehiculeEdited'),
        });
      },
    },
  });

  const vehicule = vehiculeQuery.data?.data;

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateVehiculeMutation.isSuccess}
        triggerButton={
          <Button icon={<Pen className="size-4" />} size="sm">
            {t('editVehicule')}
          </Button>
        }
        title={t('editVehicule')}
        submitButton={
          <Button
            form="update-vehicule"
            type="submit"
            size="sm"
            isLoading={updateVehiculeMutation.isPending}
          >
            {t('save')}
          </Button>
        }
      >
        <Form
          id="update-vehicule"
          onSubmit={(values) => {
            updateVehiculeMutation.mutate({
              data: values,
              vehiculeId,
            });
          }}
          options={{
            defaultValues: {
              title: vehicule?.title ?? '',
              body: vehicule?.body ?? '',
            },
          }}
          schema={updateVehiculeInputSchema}
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
