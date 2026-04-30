import { VALIDATION_ERROR, ZOD_ENTITY } from '@/common/constants';
import { CarouselTaskDto, TestResultDTO } from './dto/dto';
import * as z from 'zod';
import {
  Test,
  TestLevel,
  TestResult,
  UserCertificate,
  UserEducation,
  UserProject,
  UserWorkExperience,
} from '@/common/commonTypes';
import { OmitID } from '@/utils/utils';

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
    email: ZOD_ENTITY.EMAIL,
    password: ZOD_ENTITY.PASSWORD,
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
  firstName: ZOD_ENTITY.USER.FIRST_NAME,
  lastName: ZOD_ENTITY.USER.SECOND_NAME,
  surname: ZOD_ENTITY.USER.SURNAME,
  birthday: ZOD_ENTITY.USER.BIRTHDAY,
});

export type RegistrationStepThreeRequest = z.infer<typeof registrationStepThreeRequest>;

export const authenticationRequest = z.object({
  email: ZOD_ENTITY.EMAIL,
  password: ZOD_ENTITY.PASSWORD,
});

export type AuthenticationRequest = z.infer<typeof authenticationRequest>;
export type AuthenticationResponce = {
  token: string;
};

export type CheckEmailConfirmResponse = {
  isConfirm: boolean;
};

// Профиль

export type UserProjectRequest = OmitID<UserProject>;
export type UserEducationRequest = OmitID<UserEducation>;
export type UserWorkExperienceRequest = OmitID<UserWorkExperience>;
export type UserCertificateRequest = OmitID<UserCertificate>;
export type TestResultRequest = {
  testsResult: Array<TestResultDTO>;
};
export type TestResultsHistoryRequest = {
  testResults: Array<TestResultDTO>;
};

export const ChangeMainProfileRequestSchema = z.object({
  surname: ZOD_ENTITY.USER.SURNAME,
  contactPhone: ZOD_ENTITY.USER.CONTACT_PHONE,
  github: ZOD_ENTITY.USER.GITHUB,
});

export type PaginationRequestParams = {
  limit: number;
  offset: number;
};

export type PaginationResponse = {
  limit: number;
  offset: number;
  hasMore: boolean;
};

export type TestsFiltersRequestParams = {
  value?: string | undefined;
  difficulty?: Array<TestLevel> | undefined;
};

export type GetTestsRequest = {
  filters: TestsFiltersRequestParams;
  pagination: PaginationRequestParams;
};

export type GetTestsResponse = {
  pagination: PaginationResponse;
  tests: Array<Test>;
};

export type GetTestInformationResponse = {
  test: Test;
  lastUserAttemp: TestResult | null;
};
