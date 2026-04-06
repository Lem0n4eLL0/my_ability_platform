import { Meta, StoryObj } from '@storybook/react-vite';
import { LineTestCard } from './LineTestCard';
import dockerURL from '../../../assets/docker.png';
import { Task } from '@/common/commonTypes';

const task = {
  id: '1',
  title: 'Docker',
  description:
    'Docker - инструмент контейнеризации ПО для гибкого развертования компонентов в различных средах c поддержкой контенеризации',
  rate: 3.4,
  totalTasks: 204,
  imgURL: dockerURL as string,
};

const meta = {
  title: 'LineTestCard',
  component: LineTestCard<Task>,
  tags: ['autodocs'],
} satisfies Meta<typeof LineTestCard<Task>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardEntrance: Story = {
  args: {
    task: {
      ...task,
      level: 'ENTRANCE',
    },
  },
};

export const CardMedium: Story = {
  args: {
    task: {
      ...task,
      level: 'MEDIUM',
    },
  },
};

export const CardHard: Story = {
  args: {
    task: {
      ...task,
      level: 'HARD',
    },
  },
};

export const CardExpert: Story = {
  args: {
    task: {
      ...task,
      level: 'EXPERT',
    },
  },
};
