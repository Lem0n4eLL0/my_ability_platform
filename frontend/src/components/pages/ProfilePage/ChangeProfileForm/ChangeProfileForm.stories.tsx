import { Meta, StoryObj } from '@storybook/react-vite';
import { ChangeProfileForm } from './ChangeProfileForm';
import { User } from '@/common/commonTypes';
import { fn } from 'storybook/test';

const mockUser: User = {
  id: 1,
  firstName: 'Владислав',
  secondName: 'Черванев',
  surname: 'Александрович',
  birthday: '2004-12-10T17:35:31.927032488Z',
  profileUniqeLink: 'https://exemple.com',
  aboutMyself: null,
  contactPhone: '+79171647381',
  github: 'https://github.com/vlad',
  email: 'vladislavche@bk.ru',
  avatarLink: null,
  role: 'APPLICANT',
  projects: [],
  educations: [],
  workExperience: [],
  certificates: [],
};

const meta = {
  title: 'ChangeProfileForm',
  component: ChangeProfileForm,
  tags: ['autodocs'],
  args: {
    onСancel: fn(),
    user: mockUser,
  },
} satisfies Meta<typeof ChangeProfileForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ChangeProfileFormFull: Story = {};

export const ChangeProfileFormEmptyFields: Story = {
  args: {
    user: {
      ...mockUser,
      github: null,
      contactPhone: null,
      surname: null,
    },
  },
};
