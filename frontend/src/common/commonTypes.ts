import z from 'zod';
import { ZOD_ENTITY } from './constants';

export type UUID = string;

export const TEST_LEVELS = {
  ENTRANCE: 'ENTRANCE',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
  EXPERT: 'EXPERT',
};

export type TestLevel = keyof typeof TEST_LEVELS;

export type TaskBase = {
  id: UUID;
  title: string;
  description: string;
  rate: number;
  totalTasks: number;
  imgURL: string;
};

export type Task = TaskBase & {
  level: TestLevel;
};

export type СarouselTask = TaskBase;
export type ComparePreviewTask = Task;

export const USER_ROLES = ['ADMIN', 'APPLICANT', 'COMPANY'] as const;
export type UserRole = (typeof USER_ROLES)[number];

const UserProject = z.object({
  id: ZOD_ENTITY.UUID,
  title: ZOD_ENTITY.USER_PROJECT.TITLE,
  description: ZOD_ENTITY.USER_PROJECT.DESCRIPTION,
  link: ZOD_ENTITY.LINK,
});
export type UserProject = z.infer<typeof UserProject>;

const UserEducation = z.object({
  id: ZOD_ENTITY.UUID,
  city: ZOD_ENTITY.CITY,
  university: ZOD_ENTITY.USER_EDUCATION.UNIVERSITY,
  faculty: ZOD_ENTITY.USER_EDUCATION.FACULTY,
  specialization: ZOD_ENTITY.USER_EDUCATION.SPECIALIZATION,
  status: ZOD_ENTITY.USER_EDUCATION.STATUS,
  dataGradudatuion: ZOD_ENTITY.USER_EDUCATION.DATA_GRADUDATUION,
});
export type UserEducation = z.infer<typeof UserEducation>;

const UserWorkExperience = z.object({
  id: ZOD_ENTITY.UUID,
  city: ZOD_ENTITY.CITY,
  company: ZOD_ENTITY.USER_WORK_EXPERIENCE.COMPANY,
  yearStart: ZOD_ENTITY.USER_WORK_EXPERIENCE.DATE_START,
  yearEnd: ZOD_ENTITY.USER_WORK_EXPERIENCE.DATE_END,
  post: ZOD_ENTITY.USER_WORK_EXPERIENCE.POST,
});
export type UserWorkExperience = z.infer<typeof UserWorkExperience>;

const UserCertificate = z.object({
  id: ZOD_ENTITY.UUID,
  title: ZOD_ENTITY.USER_CERTIFICATES.TITLE,
  link: ZOD_ENTITY.LINK,
});
export type UserCertificate = z.infer<typeof UserCertificate>;

const User = z.object({
  id: ZOD_ENTITY.USER.ID_USER,
  firstName: ZOD_ENTITY.USER.FIRST_NAME,
  lastName: ZOD_ENTITY.USER.LAST_NAME,
  surname: ZOD_ENTITY.USER.SURNAME,
  birthday: ZOD_ENTITY.USER.BIRTHDAY,
  profileUniqeLink: ZOD_ENTITY.LINK,
  aboutMyself: ZOD_ENTITY.USER.ABOUT_MYSELF,
  contactPhone: ZOD_ENTITY.USER.CONTACT_PHONE,
  github: ZOD_ENTITY.USER.GITHUB,
  email: ZOD_ENTITY.EMAIL,
  avatarLink: ZOD_ENTITY.LINK,
  role: z.enum(USER_ROLES),
  get projects() {
    return z.array(UserProject);
  },
  get educations() {
    return z.array(UserEducation);
  },
  get workExperience() {
    return z.array(UserWorkExperience);
  },
  get certificates() {
    return z.array(UserCertificate);
  },
});
export type User = z.infer<typeof User>;

const TestResult = z.object({
  id: ZOD_ENTITY.UUID,
  testId: ZOD_ENTITY.UUID,
  title: ZOD_ENTITY.TESTS.TESTS_RESULT,
  estimationProcent: ZOD_ENTITY.TESTS.TESTS_RESULT.ESTIMATION_PROCENT,
  difficulty: z.enum(TEST_LEVELS),
  reconfirmationDate: ZOD_ENTITY.TESTS.TESTS_RESULT.RECONFIRMATION_DATE,
});
export type TestResult = z.infer<typeof TestResult>;
