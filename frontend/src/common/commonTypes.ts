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

export const TEST_LEVELS_PRIORITY: Record<TestLevel, number> = {
  ENTRANCE: 1,
  MEDIUM: 2,
  HARD: 3,
  EXPERT: 4,
};

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

export const UserProjectSchema = z.object({
  id: ZOD_ENTITY.UUID,
  title: ZOD_ENTITY.USER_PROJECT.TITLE,
  description: ZOD_ENTITY.USER_PROJECT.DESCRIPTION,
  link: ZOD_ENTITY.LINK,
});
export type UserProject = z.infer<typeof UserProjectSchema>;

export const UserEducationSchema = z.object({
  id: ZOD_ENTITY.UUID,
  city: ZOD_ENTITY.CITY,
  university: ZOD_ENTITY.USER_EDUCATION.UNIVERSITY,
  faculty: ZOD_ENTITY.USER_EDUCATION.FACULTY,
  specialization: ZOD_ENTITY.USER_EDUCATION.SPECIALIZATION,
  status: ZOD_ENTITY.USER_EDUCATION.STATUS,
  yearGradudatuion: ZOD_ENTITY.USER_EDUCATION.YEAR_GRADUDATUION,
});
export type UserEducation = z.infer<typeof UserEducationSchema>;

export const UserWorkExperienceSchema = z.object({
  id: ZOD_ENTITY.UUID,
  city: ZOD_ENTITY.CITY,
  company: ZOD_ENTITY.USER_WORK_EXPERIENCE.COMPANY,
  dateStart: ZOD_ENTITY.USER_WORK_EXPERIENCE.DATE_START,
  dateEnd: ZOD_ENTITY.USER_WORK_EXPERIENCE.DATE_END,
  post: ZOD_ENTITY.USER_WORK_EXPERIENCE.POST,
});
export type UserWorkExperience = z.infer<typeof UserWorkExperienceSchema>;

export const UserCertificateSchema = z.object({
  id: ZOD_ENTITY.UUID,
  title: ZOD_ENTITY.USER_CERTIFICATES.TITLE,
  link: ZOD_ENTITY.LINK,
});
export type UserCertificate = z.infer<typeof UserCertificateSchema>;

export const UserSchema = z.object({
  id: ZOD_ENTITY.USER.ID_USER,
  firstName: ZOD_ENTITY.USER.FIRST_NAME,
  secondName: ZOD_ENTITY.USER.SECOND_NAME,
  surname: ZOD_ENTITY.USER.SURNAME,
  birthday: ZOD_ENTITY.USER.BIRTHDAY,
  profileUniqeLink: ZOD_ENTITY.LINK,
  aboutMyself: ZOD_ENTITY.USER.ABOUT_MYSELF,
  contactPhone: ZOD_ENTITY.USER.CONTACT_PHONE,
  github: ZOD_ENTITY.USER.GITHUB,
  email: ZOD_ENTITY.EMAIL,
  avatarLink: ZOD_ENTITY.LINK.nullable(),
  role: z.enum(USER_ROLES),
  get projects() {
    return z.array(UserProjectSchema);
  },
  get educations() {
    return z.array(UserEducationSchema);
  },
  get workExperience() {
    return z.array(UserWorkExperienceSchema);
  },
  get certificates() {
    return z.array(UserCertificateSchema);
  },
});
export type User = z.infer<typeof UserSchema>;

export const TestResultSchema = z.object({
  id: ZOD_ENTITY.UUID,
  testId: ZOD_ENTITY.UUID,
  title: ZOD_ENTITY.TESTS.TESTS_RESULT,
  estimationProcent: ZOD_ENTITY.TESTS.TESTS_RESULT.ESTIMATION_PROCENT,
  isTestPassed: z.boolean(),
  difficulty: z.enum(TEST_LEVELS),
  reconfirmationDate: ZOD_ENTITY.TESTS.TESTS_RESULT.RECONFIRMATION_DATE,
});
export type TestResult = z.infer<typeof TestResultSchema>;
