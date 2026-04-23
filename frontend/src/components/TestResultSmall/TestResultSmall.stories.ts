import { Meta, StoryObj } from '@storybook/react-vite';
import { TestResultSmall } from './TestResultSmall';
import { TestResult } from '@/common/commonTypes';

const mockTest: TestResult = {
  id: '1r',
  testId: '1t',
  title: 'React',
  estimationProcent: 75,
  isTestPassed: true,
  difficulty: 'ENTRANCE',
  reconfirmationDate: '2027-02-10T17:35:31.927032488Z',
};
const meta = {
  title: 'TestResultSmall',
  component: TestResultSmall,

  args: {
    test: mockTest,
  },

  tags: ['autodocs'],
} satisfies Meta<typeof TestResultSmall>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TestResultSmallEntarance: Story = {};
export const TestResultSmallMedium: Story = {
  args: {
    test: {
      ...mockTest,
      difficulty: 'MEDIUM',
      estimationProcent: 87,
    },
  },
};
export const TestResultSmallHard: Story = {
  args: {
    test: {
      ...mockTest,
      difficulty: 'HARD',
      estimationProcent: 70,
    },
  },
};
export const TestResultSmallExpert: Story = {
  args: {
    test: {
      ...mockTest,
      difficulty: 'EXPERT',
      estimationProcent: 96,
    },
  },
};
