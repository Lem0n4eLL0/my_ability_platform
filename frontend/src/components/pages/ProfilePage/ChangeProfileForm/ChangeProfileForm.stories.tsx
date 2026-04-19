import { Meta, StoryObj } from '@storybook/react-vite';
import { ChangeProfileForm } from './ChangeProfileForm';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { userReduser } from '@/services/slices/user';
import { User } from '@/common/commonTypes';

const createMockStore = () =>
  configureStore({
    reducer: {
      user: userReduser,
    },
  });

const mockUser: User = {
  id: 1,
  firstName: 'Владислав',
  secondName: 'Черванев',
  surname: 'Александрович',
  birthday: '2004-12-10T17:35:31.927032488Z',
  profileUniqeLink: 'https://exemple.com',
  aboutMyself: undefined,
  contactPhone: '+79171647381',
  github: 'https://github.com/vlad',
  email: 'vladislavche@bk.ru',
  avatarLink: undefined,
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
  decorators: [
    Story => (
      <Provider store={createMockStore()}>
        <Story />
      </Provider>
    ),
  ],
  args: {
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
      github: undefined,
      contactPhone: undefined,
      surname: undefined,
    },
  },
};
