import z from 'zod';
import { ZOD_ENTITY } from './constants';
import { SyntheticEvent } from 'react';

export type UUID = string;

export const TEST_LEVELS = {
  ENTRANCE: 'ENTRANCE',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
  EXPERT: 'EXPERT',
};

export const TEST_LEVELS_RU: {
  [value in keyof typeof TEST_LEVELS]: string;
} = {
  ENTRANCE: 'Начинающий',
  MEDIUM: 'Средний',
  HARD: 'Сложный',
  EXPERT: 'Продвинутый',
};

export const TEST_LEVELS_ARRAY = ['ENTRANCE', 'MEDIUM', 'HARD', 'EXPERT'] as const;
export type TestLevel = keyof typeof TEST_LEVELS;

export const TEST_LEVELS_PRIORITY: Record<TestLevel, number> = {
  ENTRANCE: 1,
  MEDIUM: 2,
  HARD: 3,
  EXPERT: 4,
};

export const USER_ROLES = ['ADMIN', 'APPLICANT', 'COMPANY'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const UserProjectSchema = z.object({
  id: ZOD_ENTITY.UUID,
  title: ZOD_ENTITY.USER_PROJECT.TITLE,
  description: ZOD_ENTITY.USER_PROJECT.DESCRIPTION,
  link: ZOD_ENTITY.USER.GITHUB,
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
  link: ZOD_ENTITY.EXTERNAL_LINK,
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
  title: ZOD_ENTITY.TESTS.TESTS_RESULT.TITLE,
  estimationProcent: ZOD_ENTITY.TESTS.TESTS_RESULT.ESTIMATION_PROCENT,
  isTestPassed: z.boolean(),
  difficulty: z.enum(TEST_LEVELS_ARRAY),
  reconfirmationDate: ZOD_ENTITY.TESTS.TESTS_RESULT.RECONFIRMATION_DATE,
  completionDate: ZOD_ENTITY.TESTS.TESTS_RESULT.COMPLETION_DATE,
});
export type TestResult = z.infer<typeof TestResultSchema>;

export type QuestionType = 'OPTION' | 'CHOICE' | 'TEXT' | 'CODE';
export const QUESTION_TYPE_ARRAY = ['OPTION', 'CHOICE', 'TEXT', 'CODE'] as const;

const QuestionsTypeQuantitySchema = z.partialRecord(z.enum(QUESTION_TYPE_ARRAY), z.number().min(0));
export type TestTypeQuantity = z.infer<typeof QuestionsTypeQuantitySchema>;

export const TestSchema = z.object({
  id: ZOD_ENTITY.UUID,
  title: ZOD_ENTITY.TEST.TITLE,
  description: ZOD_ENTITY.TEST.DESCRIPTION.nullable(),
  rate: ZOD_ENTITY.TEST.RATE,
  imgURL: ZOD_ENTITY.LINK.nullable(),
  difficulty: z.enum(TEST_LEVELS_ARRAY),
  totalTasks: ZOD_ENTITY.TEST.TOTAL_TASKS,
  timeLimitSeconds: ZOD_ENTITY.TEST.TIME_LIMIT_SECONDS.nullable(),
  rechargeTimeSecondes: ZOD_ENTITY.TEST.RECHARGE_TIME_SECONDS.nullable(),
  reconfirmationTimeSeconds: ZOD_ENTITY.TEST.RECONFIRMATION_TIME_SECONDS.nullable(),
  get questionsTypesQuantity() {
    return QuestionsTypeQuantitySchema.nullable();
  },
});

export type Test = z.infer<typeof TestSchema>;

export type ChoiceBox = {
  isChecked: boolean;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};
