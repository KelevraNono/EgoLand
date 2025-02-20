import { Meta, StoryObj } from '@storybook/react';
import { t } from 'i18next';

import { Table } from './table';

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;

type User = {
  id: string;
  createdAt: number;
  name: string;
  title: string;
  role: string;
  email: string;
};

type Story = StoryObj<typeof Table<User>>;

const data: User[] = [
  {
    id: '1',
    createdAt: Date.now(),
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'jane.cooper@example.com',
  },
  {
    id: '2',
    createdAt: Date.now(),
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    role: 'Owner',
    email: 'cody.fisher@example.com',
  },
];

export const Default: Story = {
  args: {
    data,
    columns: [
      {
        title: t('name'),
        field: 'name',
      },
      {
        title: t('title'),
        field: 'title',
      },
      {
        title: t('role'),
        field: 'role',
      },
      {
        title: t('email'),
        field: 'email',
      },
    ],
  },
};
