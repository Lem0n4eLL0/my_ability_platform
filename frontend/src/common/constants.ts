import { RequestStatus } from '@/api/apiTypes';
import z from 'zod';

export const LOCAL_STORAGE_ACCESS_TOKEN_ALIAS = 'accessToken';

// Entity
export const READY_REQUEST_STATUS: RequestStatus = {
  status: 'READY',
  error: undefined,
};

// RegExp
export const PASSWORD_REGEX: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// response errors

export const RESPONSE_ERRORS = {
  REFRESH_TOKEN_EXPIRED: 'REFRESH_TOKEN_EXPIRED',
  PROFILE_NOT_REGISTERED: 'PROFILE_NOT_REGISTERED',
  ACCESS_TOKEN_EXPIRED: 'ACCESS_TOKEN_EXPIRED',
};

// validation error
export const VALIDATION_ERROR = {
  NOT_EMPTY: 'Поле не может быть пустым',
  LETTERS_AND_SOME_SYMB: 'Поле может содержать только буквы, пробелы и дефис',
  EMAIL: 'Неверный формат почты',
  MIN_SYMB: (value: number, field?: string) =>
    `${field ? field : 'Поле'} должно содержать минимум ${value} символа`,
  MAX_SYMB: (value: number, field?: string) =>
    `${field ? field : 'Поле'} должно содержать максимум ${value} символов`,
};

// ZOD Validation

export const ZOD_ENTITY = {
  UUID: z.uuid(),
  EMAIL: z.email({ error: VALIDATION_ERROR.EMAIL }),
  PASSWORD: z
    .string()
    .min(8, VALIDATION_ERROR.MIN_SYMB(8))
    .max(20, VALIDATION_ERROR.MAX_SYMB(20))
    .regex(/[A-Za-z]/, 'Нужна хотя бы одна буква')
    .regex(/\d/, 'Нужна хотя бы одна цифра'),
  CITY: z.string().min(1, VALIDATION_ERROR.MIN_SYMB(1)).max(50, VALIDATION_ERROR.MAX_SYMB(50)),
  LINK: z.url(),
  USER: {
    ID_USER: z.number(),
    FIRST_NAME: z
      .string()
      .min(1, 'Имя обязательно')
      .min(2, VALIDATION_ERROR.MIN_SYMB(2, 'Имя'))
      .max(50, VALIDATION_ERROR.MAX_SYMB(50, 'Имя'))
      .regex(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, VALIDATION_ERROR.LETTERS_AND_SOME_SYMB)
      .transform(val => val.trim()),
    SECOND_NAME: z
      .string()
      .min(1, 'Фамилия обязательна')
      .min(2, VALIDATION_ERROR.MIN_SYMB(2, 'Фамилия'))
      .max(50, VALIDATION_ERROR.MAX_SYMB(50, 'Фамилия'))
      .regex(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, VALIDATION_ERROR.LETTERS_AND_SOME_SYMB)
      .transform(val => val.trim()),
    SURNAME: z
      .literal('')
      .or(
        z
          .string()
          .min(2, VALIDATION_ERROR.MIN_SYMB(2, 'Отчество'))
          .max(50, VALIDATION_ERROR.MAX_SYMB(50, 'Отчество'))
          .regex(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, VALIDATION_ERROR.LETTERS_AND_SOME_SYMB)
      )
      .transform(val => (val === '' ? null : val))
      .nullable(),
    BIRTHDAY: z.string({ error: 'Дата рождения обязательна' }).refine(dateString => {
      const today = new Date();
      const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
      const maxDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
      const date = new Date(dateString);
      return date >= minDate && date <= maxDate;
    }, 'Возраст должен быть от 5 до 120 лет'),
    ABOUT_MYSELF: z
      .literal('')
      .or(
        z
          .string()
          .min(2, VALIDATION_ERROR.MIN_SYMB(2, 'О себе'))
          .max(255, VALIDATION_ERROR.MAX_SYMB(2, 'О себе'))
      )
      .transform(val => (val === '' ? null : val))
      .nullable(),
    CONTACT_PHONE: z
      .literal('')
      .or(z.e164({ error: 'Неверный формат телефона' }))
      .transform(val => (val === '' ? null : val))
      .nullable(),
    GITHUB: z
      .literal('')
      .or(
        z.url({
          hostname: /^github\.com$/,
          protocol: /^https$/,
          error: 'Допустима только ссылка на github',
        })
      )
      .transform(val => (val === '' ? null : val))
      .nullable(),
    AVATAR_LINK: z.url().nullable(),
  },
  USER_PROJECT: {
    TITLE: z
      .string()
      .min(2, VALIDATION_ERROR.MIN_SYMB(2, 'Заголовок'))
      .max(50, VALIDATION_ERROR.MAX_SYMB(50, 'Заголовок')),
    DESCRIPTION: z.string().max(255, VALIDATION_ERROR.MAX_SYMB(255, 'Описание')),
  },
  USER_EDUCATION: {
    UNIVERSITY: z
      .string()
      .min(2, VALIDATION_ERROR.MIN_SYMB(2))
      .max(100, VALIDATION_ERROR.MAX_SYMB(100)),
    FACULTY: z
      .string()
      .min(2, VALIDATION_ERROR.MIN_SYMB(2))
      .max(100, VALIDATION_ERROR.MAX_SYMB(100)),
    SPECIALIZATION: z
      .string()
      .min(2, VALIDATION_ERROR.MIN_SYMB(2))
      .max(100, VALIDATION_ERROR.MAX_SYMB(100)),
    STATUS: z.string().nullable(),
    YEAR_GRADUDATUION: z
      .number()
      .nullable()
      .refine(
        year => {
          if (!year) return true;
          return year > 1900 && year < new Date().getFullYear() + 10;
        },
        `Год выпуска должен находится в рамках 1900-${new Date().getFullYear() + 10}`
      ),
  },
  USER_WORK_EXPERIENCE: {
    COMPANY: z
      .string()
      .min(2, VALIDATION_ERROR.MIN_SYMB(2))
      .max(100, VALIDATION_ERROR.MAX_SYMB(100)),
    DATE_START: z.string(),
    DATE_END: z
      .string()
      .nullable()
      .refine(dateStr => {
        if (!dateStr) return;
        const date = new Date(dateStr);
        return date < new Date();
      }, 'Нельзя выбрать дату в будущем'),
    POST: z.string().min(2, VALIDATION_ERROR.MIN_SYMB(2)).max(100, VALIDATION_ERROR.MAX_SYMB(100)),
  },
  USER_CERTIFICATES: {
    TITLE: z.string().min(2, VALIDATION_ERROR.MIN_SYMB(2)).max(100, VALIDATION_ERROR.MAX_SYMB(100)),
  },
  TESTS: {
    TESTS_RESULT: {
      TITLE: z
        .string()
        .min(2, VALIDATION_ERROR.MIN_SYMB(2))
        .max(100, VALIDATION_ERROR.MAX_SYMB(100)),
      ESTIMATION_PROCENT: z.number().gte(0, 'Значение не может быть отрицательным'),
      RECONFIRMATION_DATE: z.string(),
    },
  },
};
