import { Meta, StoryObj } from '@storybook/react-vite';
import { LineTestCard } from './LineTestCard';
import dockerURL from '../../../assets/docker.png';
import { Test } from '@/common/commonTypes';

const test: Test = {
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
};

const meta = {
  title: 'LineTestCard',
  component: LineTestCard,
  tags: ['autodocs'],
} satisfies Meta<typeof LineTestCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardEntrance: Story = {
  args: {
    test: {
      ...test,
      difficulty: 'ENTRANCE',
    },
  },
};

export const CardMedium: Story = {
  args: {
    test: {
      ...test,
      difficulty: 'MEDIUM',
    },
  },
};

export const CardHard: Story = {
  args: {
    test: {
      ...test,
      difficulty: 'HARD',
    },
  },
};

export const CardExpert: Story = {
  args: {
    test: {
      ...test,
      difficulty: 'EXPERT',
    },
  },
};
