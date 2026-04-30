import { Meta, StoryObj } from '@storybook/react-vite';
import { StepIcon } from './StepIcon';

const meta = {
  title: 'StepIcon',
  component: StepIcon,

  tags: ['autodocs'],
} satisfies Meta<typeof StepIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfileIconStoryBase: Story = {
  args: {
    src: 'src/assets/user-profile-icon.svg',
    alt: 'profile',
  },
};

export const DoubleCheckIconStoryBase: Story = {
  args: {
    src: 'src/assets/check-double-icon.svg',
    alt: 'check',
  },
};

export const LinkIconStoryBase: Story = {
  args: {
    src: 'src/assets/link-icon.svg',
    alt: 'link',
  },
};

export const CupIconStoryBase: Story = {
  args: {
    src: 'src/assets/cup-icon.svg',
    alt: 'cup',
  },
};
