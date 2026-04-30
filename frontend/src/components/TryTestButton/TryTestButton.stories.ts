import { Meta, StoryObj } from '@storybook/react-vite';
import { TryTestButton } from './TryTestButton';
import { fn } from 'storybook/test';

const meta = {
  title: 'TryTestButton',
  component: TryTestButton,
  tags: ['autodocs'],

  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof TryTestButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseButton: Story = {};
