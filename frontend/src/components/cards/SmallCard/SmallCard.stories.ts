import { Meta, StoryObj } from '@storybook/react-vite';
import { SmallCard } from './SmallCard';
import dockerURL from '../../../assets/docker.png';

const meta = {
  title: 'SmallCard',
  component: SmallCard,

  tags: ['autodocs'],
} satisfies Meta<typeof SmallCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseCard: Story = {
  args: {
    task: {
      id: '1',
      title: 'Docker',
      description:
        'Docker - инструмент контейнеризации ПО для гибкого развертования компонентов в различных средах c поддержкой контенеризации',
      rate: 3.4,
      totalTests: 204,
      imgURL: dockerURL,
    },
  },
};
