import { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { Button } from '../button';

import { Form } from './form';
import { FormDrawer } from './form-drawer';
import { Input } from './input';
import { Select } from './select';
import { Textarea } from './textarea';

const MyForm = ({ hideSubmit = false }: { hideSubmit?: boolean }) => {
  return (
    <Form
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      schema={z.object({
        title: z.string().min(1, 'Obligatoire'),
        description: z.string().min(1, 'Obligatoire'),
        type: z.string().min(1, 'Obligatoire'),
      })}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <Input
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />
          <Textarea
            label="Description"
            error={formState.errors['description']}
            registration={register('description')}
          />
          <Select
            label="Type"
            error={formState.errors['type']}
            registration={register('type')}
            options={['A', 'B', 'C'].map((type) => ({
              label: type,
              value: type,
            }))}
          />

          {!hideSubmit && (
            <div>
              <Button type="submit" className="w-full">
                Enregistrer
              </Button>
            </div>
          )}
        </>
      )}
    </Form>
  );
};

const meta: Meta = {
  component: MyForm,
};

export default meta;

type Story = StoryObj<typeof MyForm>;

export const Default: Story = {
  render: () => <MyForm />,
};

export const AsFormDrawer: Story = {
  render: () => (
    <FormDrawer
      triggerButton={<Button>Ouvrir formulaire</Button>}
      isDone={true}
      title="My Form"
      submitButton={
        <Button form="my-form" type="submit">
          Enregistrer
        </Button>
      }
    >
      <MyForm hideSubmit />
    </FormDrawer>
  ),
};
