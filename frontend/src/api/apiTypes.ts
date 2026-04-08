import { PASSWORD_REGEX } from '@/common/constants';
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

const RegistrationStepOneRequest = z
  .object({
    email: z.email(),
    password: z.string().regex(PASSWORD_REGEX),
    confirm: z.string().regex(PASSWORD_REGEX),
    isAgreementAccepted: z.boolean(),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })
  .refine(data => data.isAgreementAccepted === true, {
    message: 'Please accept the terms and conditions',
    path: ['isAgreementAccepted'],
  });

export type RegistrationStepOneRequest = Omit<
  z.infer<typeof RegistrationStepOneRequest>,
  'confirm'
>;

export type ConfirmEmailRequest = {
  token: string;
};

const RegistrationStepThreeRequest = z.object({
  firstName: z.string(),
  lastName: z.string(),
  surname: z.string(),
  birthday: z.date(),
});

export type RegistrationStepThreeRequest = z.infer<typeof RegistrationStepThreeRequest>;

const AuthenticationRequest = z.object({
  email: z.email(),
  password: z.string().regex(PASSWORD_REGEX),
});

export type AuthenticationRequest = z.infer<typeof AuthenticationRequest>;
export type AuthenticationResponce = {
  token: string;
};
// Профиль
