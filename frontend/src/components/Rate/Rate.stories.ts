import { Meta, StoryObj } from '@storybook/react-vite';
import { Rate } from './Rate';

const meta = {
  title: 'Rate',
  component: Rate,
  args: {
    size: 'sm',
    starsNumber: 5,
    ratingMax: 5,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Rate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FiveStarRateOne: Story = {
  args: {
    rating: 1,
  },
};

export const FiveStarRateHalf: Story = {
  args: {
    rating: 3.4,
  },
};

export const FiveStarRateFive: Story = {
  args: {
    rating: 5,
  },
};

export const FiveStarRateLowerOne: Story = {
  args: {
    rating: 0.3,
  },
};

export const OneStarRateThree: Story = {
  args: {
    starsNumber: 1,
    rating: 3,
  },
};

export const OneStarRateFive: Story = {
  args: {
    starsNumber: 1,
    rating: 5,
  },
};

export const FiveStarRateRight: Story = {
  args: {
    rating: 3.4,
    ratePosition: 'right',
  },
};

export const OneStarRateRight: Story = {
  args: {
    rating: 4,
    starsNumber: 1,
    ratePosition: 'right',
  },
};

export const TenStarsRateRight: Story = {
  args: {
    rating: 7.8,
    ratingMax: 10,
    starsNumber: 10,
  },
};
