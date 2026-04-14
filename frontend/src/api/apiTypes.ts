import { VALIDATION_ERROR } from '@/common/constants';
import { CarouselTaskDto } from './dto/dto';
import * as z from 'zod';

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export enum ErrorCode {
  INTERNAL_SERVER_ERROR,
  MISSING_PARAMETER,
  INVALID_INPUT,
  TOKEN_EXPIRED,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_NOT_FOUND,
  EMAIL_TOKEN_EXPIRED,
  INVALID_EMAIL_TOKEN,
  AUTHORIZATION_ERROR,
  ACCESS_DENIED,
  BAD_CREDENTIALS,
  ACCOUNT_BLOCKED,
  ACCOUNT_DISABLED,
  TOO_MANY_RESEND_VERIFICATION,
  USER_ALREADY_ACTIVATION,
  USER_NOT_FOUND,
  USER_EMAIL_ALREADY_USED,
  PERSONAL_DATA_CONSENT_REQUIRED,
}

export type RequestError = {
  timestamp: string;
  path: string;
  status: number;
  error: string;
  errorCode: string;
  message: string;
};

export type FetchStatus = 'READY' | 'PENDING' | 'ERROR' | 'SUCCESS';

export type RequestStatus = {
  status: FetchStatus;
  error?: RequestError | undefined;
};

export type RefreshTokenResponce = {
  token: string;
};

export interface CarouselTasksResponseDto {
  tasks: CarouselTaskDto[];
}

// Регистрация

export const registrationStepOneRequest = z
  .object({
    email: z.email({ error: VALIDATION_ERROR.EMAIL }),
    password: z
      .string()
      .min(8, VALIDATION_ERROR.MIN_SYMB(8))
      .max(20, VALIDATION_ERROR.MAX_SYMB(20))
      .regex(/[A-Za-z]/, 'Нужна хотя бы одна буква')
      .regex(/\d/, 'Нужна хотя бы одна цифра'),
    confirm: z.string().nonempty({ error: VALIDATION_ERROR.NOT_EMPTY }),
    isAgreementAccepted: z.boolean(),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'],
  })
  .refine(data => data.isAgreementAccepted === true, {
    message: 'Необходимо принять пользовательское соглашение',
    path: ['isAgreementAccepted'],
  });

export type RegistrationStepOneRequest = Omit<
  z.infer<typeof registrationStepOneRequest>,
  'confirm'
>;

export type ConfirmEmailRequest = {
  token: string;
};

export const registrationStepThreeRequest = z.object({
  firstName: z
    .string()
    .min(1, 'Имя обязательно')
    .min(2, VALIDATION_ERROR.MAX_SYMB(2, 'Имя'))
    .max(50, VALIDATION_ERROR.MAX_SYMB(50, 'Имя'))
    .regex(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, VALIDATION_ERROR.LETTERS_AND_SOME_SYMB)
    .transform(val => val.trim()),

  lastName: z
    .string()
    .min(1, 'Фамилия обязательна')
    .min(2, VALIDATION_ERROR.MAX_SYMB(2, 'Фамилия'))
    .max(50, VALIDATION_ERROR.MAX_SYMB(50, 'Фамилия'))
    .regex(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, VALIDATION_ERROR.LETTERS_AND_SOME_SYMB)
    .transform(val => val.trim()),

  surname: z
    .string()
    .min(2, VALIDATION_ERROR.MAX_SYMB(2, 'Отчество'))
    .max(50, VALIDATION_ERROR.MAX_SYMB(50, 'Отчество'))
    .regex(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, VALIDATION_ERROR.LETTERS_AND_SOME_SYMB)
    .transform(val => val.trim())
    .optional(),

  birthday: z.date({ error: 'Дата рождения обязательна' }).refine(date => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
    return date >= minDate && date <= maxDate;
  }, 'Возраст должен быть от 5 до 120 лет'),
});

export type RegistrationStepThreeRequest = z.infer<typeof registrationStepThreeRequest>;

export const authenticationRequest = z.object({
  email: z.email({ error: VALIDATION_ERROR.EMAIL }),
  password: z
    .string()
    .min(8, VALIDATION_ERROR.MIN_SYMB(8))
    .max(20, VALIDATION_ERROR.MAX_SYMB(20))
    .regex(/[A-Za-z]/, 'Нужна хотя бы одна буква')
    .regex(/\d/, 'Нужна хотя бы одна цифра'),
});

export type AuthenticationRequest = z.infer<typeof authenticationRequest>;
export type AuthenticationResponce = {
  token: string;
};

export type CheckEmailConfirmResponse = {
  isConfirm: boolean;
};
// Профиль
