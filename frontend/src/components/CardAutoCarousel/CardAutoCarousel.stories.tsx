import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardAutoCarousel } from './CardAutoCarousel';
import dockerURL from '@assets/docker.png';
import { Test } from '@/common/commonTypes';
import { SmallTestCard } from '../cards/SmallTestCard';

const meta = {
  title: 'Components/CardAutoCarousel',
  component: CardAutoCarousel,
  tags: ['autodocs'],
} satisfies Meta<typeof CardAutoCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTests: Test[] = [
  {
    id: '1',
    title: 'React Developer Test',
    imgURL: dockerURL as string,
    totalTasks: 15,
    rate: 4.5,
    description: '',
    difficulty: 'ENTRANCE',
    timeLimitSeconds: null,
    rechargeTimeSecondes: null,
    reconfirmationTimeSeconds: null,
  },
  {
    id: '2',
    title: 'Node.js Backend Test',
    imgURL: dockerURL as string,
    totalTasks: 120,
    rate: 4.7,
    description: '',
    difficulty: 'ENTRANCE',
    timeLimitSeconds: null,
    rechargeTimeSecondes: null,
    reconfirmationTimeSeconds: null,
  },
  {
    id: '3',
    title: 'Python Data Science',
    imgURL: dockerURL as string,
    totalTasks: 12,
    rate: 4.3,
    description: '',
    difficulty: 'ENTRANCE',
    timeLimitSeconds: null,
    rechargeTimeSecondes: null,
    reconfirmationTimeSeconds: null,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    imgURL: dockerURL as string,
    totalTasks: 18,
    rate: 4.6,
    description: '',
    difficulty: 'ENTRANCE',
    timeLimitSeconds: null,
    rechargeTimeSecondes: null,
    reconfirmationTimeSeconds: null,
  },
  {
    id: '5',
    title: 'Frontend Architecture',
    imgURL: dockerURL as string,
    totalTasks: 40,
    rate: 4.8,
    description: '',
    difficulty: 'ENTRANCE',
    timeLimitSeconds: null,
    rechargeTimeSecondes: null,
    reconfirmationTimeSeconds: null,
  },
  {
    id: '6',
    title: 'Engine test',
    imgURL: dockerURL as string,
    totalTasks: 10,
    rate: 3.1,
    description: '',
    difficulty: 'ENTRANCE',
    timeLimitSeconds: null,
    rechargeTimeSecondes: null,
    reconfirmationTimeSeconds: null,
  },
  {
    id: '7',
    title: 'The balance test',
    imgURL: dockerURL as string,
    totalTasks: 56,
    rate: 4.3,
    description: '',
    difficulty: 'ENTRANCE',
    timeLimitSeconds: null,
    rechargeTimeSecondes: null,
    reconfirmationTimeSeconds: null,
  },
  {
    id: '8',
    title: 'Frontend Vue',
    imgURL: dockerURL as string,
    totalTasks: 10,
    rate: 4.8,
    description: '',
    difficulty: 'ENTRANCE',
    timeLimitSeconds: null,
    rechargeTimeSecondes: null,
    reconfirmationTimeSeconds: null,
  },
];

export const CardEntrance: Story = {
  args: {
    items: mockTests.map(test => <SmallTestCard key={test.id} test={test} />),
  },
};
