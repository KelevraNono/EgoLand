import { Meta, StoryObj } from '@storybook/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useRef } from 'react';

const DemoDialog = () => {
  const { close, open, isOpen } = useDisclosure();
  const cancelButtonRef = useRef(null);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          close();
        } else {
          open();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Lorem ipsum</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">Lorem ipsum</div>

        <DialogFooter>
          <Button type="submit">Enregistrer</Button>
          <Button ref={cancelButtonRef} variant="outline" onClick={close}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const meta: Meta = {
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Demo: Story = {
  render: () => <DemoDialog />,
};
