import { Meta, StoryObj } from '@storybook/react-vite';
import { configureStore } from '@reduxjs/toolkit';
import { userReduser } from '@/services/slices/user';
import {
  User,
  UserCertificate,
  UserEducation,
  UserProject,
  UserWorkExperience,
} from '@/common/commonTypes';
import { FillProfile } from './FillProfile';

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

const mockCertificate: UserCertificate = {
  id: '',
  title: '',
  link: '',
};
const mockProject: UserProject = {
  id: '',
  title: '',
  description: '',
  link: '',
};
const mockEducation: UserEducation = {
  id: '',
  city: '',
  university: '',
  faculty: '',
  specialization: '',
  status: null,
  yearGradudatuion: null,
};
const mockWorkExperience: UserWorkExperience = {
  id: '',
  city: '',
  company: '',
  dateStart: '',
  dateEnd: null,
  post: '',
};

const meta = {
  title: 'FillProfile',
  component: FillProfile,
  tags: ['autodocs'],
  args: {
    user: mockUser,
  },
} satisfies Meta<typeof FillProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FillProfileEmpty: Story = {};

export const FillProfileSome: Story = {
  args: {
    user: {
      ...mockUser,
      aboutMyself: 'О себе',
      certificates: [mockCertificate],
    },
  },
};

export const FillProfileAll: Story = {
  args: {
    user: {
      ...mockUser,
      aboutMyself: 'О себе',
      certificates: [mockCertificate],
      projects: [mockProject],
      workExperience: [mockWorkExperience],
      educations: [mockEducation],
    },
  },
};
