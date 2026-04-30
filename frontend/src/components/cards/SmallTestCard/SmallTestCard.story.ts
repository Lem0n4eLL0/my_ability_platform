import { Meta, StoryObj } from '@storybook/react-vite';
import dockerURL from '../../../assets/docker.png';
import { SmallTestCard } from './SmallTestCard';

const meta = {
  title: 'SmallTestCard',
  component: SmallTestCard,

  tags: ['autodocs'],
} satisfies Meta<typeof SmallTestCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseCard: Story = {
  args: {
    test: {
      id: '1',
      title: 'Docker',
      description:
        'Docker - инструмент контейнеризации ПО для гибкого развертования компонентов в различных средах c поддержкой контенеризации',
      rate: 3.4,
      totalTasks: 204,
      imgURL: dockerURL as string,
      difficulty: 'ENTRANCE',
      timeLimitSeconds: null,
      rechargeTimeSecondes: null,
      reconfirmationTimeSeconds: null,
    },
  },
};
