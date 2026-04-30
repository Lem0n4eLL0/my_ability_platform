import { Meta, StoryObj } from '@storybook/react-vite';
import { InformationField } from './InformationField';
import { fn } from 'storybook/test';

const meta = {
  title: 'InformationField',
  component: InformationField,
  tags: ['autodocs'],
  args: {
    children: 'Тестовая информация для поля',
  },
} satisfies Meta<typeof InformationField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InformationFieldBase: Story = {};

export const InformationFieldCanChange: Story = {
  args: {
    canChange: fn(),
  },
};

export const InformationFieldBig: Story = {
  args: {
    canChange: fn(),
    children:
      'Тестовая информация для поля Тестовая информация для поля Тестовая информация для поля Тестовая информация для поля Тестовая информация для поля Тестовая информация для поля Тестовая информация для поля',
  },
};

export const InformationFieldLable: Story = {
  args: {
    lable: 'Обо мне',
  },
};

export const InformationFieldAddButton: Story = {
  args: {
    canAdd: fn(),
  },
};

export const InformationFieldLableAndAddButton: Story = {
  args: {
    lable: 'Обо мне',
    canAdd: fn(),
  },
};
