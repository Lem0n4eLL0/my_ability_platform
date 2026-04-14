import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';
import { baseHeaders, bulidURL, fetchWithCheckResponse, fetchWithRefresh } from './apiHelp';
import {
  AuthenticationRequest,
  AuthenticationResponce,
  CarouselTasksResponseDto,
  CheckEmailConfirmResponse,
  ConfirmEmailRequest,
  HTTP_METHODS,
  RefreshTokenResponce,
  RegistrationStepOneRequest,
  RegistrationStepThreeRequest,
} from './apiTypes';
import {
  mapCarouselTasksResponseToDomain,
  mapStepThreeRequestToDTO,
  mapTasksResponseToDomain,
} from './dto/schemas';
import { TasksResponseDto } from './dto/dto';
import { User } from '@/common/commonTypes';

export const URL_API = import.meta.env.VITE_APP_API_URL || '';

export const URL_PREFIX = '/api/v1/';

export const refreshToken = () => {
  return fetchWithCheckResponse<RefreshTokenResponce>(bulidURL('auth/refresh'), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    credentials: 'include',
  }).then(res => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, res.token);
    return res;
  });
};

export const getCarouselTasks = () => {
  return fetchWithCheckResponse<CarouselTasksResponseDto>(bulidURL('tasks/carousel'), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return mapCarouselTasksResponseToDomain(res);
  });
};

export const getComparePreviewTasks = () => {
  return fetchWithCheckResponse<TasksResponseDto>(bulidURL('tasks/compare-preview'), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return mapTasksResponseToDomain(res);
  });
};

export const authenticationVerification = () => {
  return fetchWithRefresh(bulidURL('auth/verify'), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  });
};

export const registrationStepOne = (body: RegistrationStepOneRequest) => {
  return fetchWithCheckResponse(bulidURL('registration/step-one'), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(body),
  });
};

export type ConfirmEmailResponse = {
  key: string;
  token: string;
};
export const confirmEmail = (body: ConfirmEmailRequest) => {
  return fetchWithCheckResponse<ConfirmEmailResponse>(bulidURL('registration/confirm-email'), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(body),
  }).then(res => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, res.token);
    return res;
  });
};

export const checkEmailConfirm = () => {
  return fetchWithCheckResponse<CheckEmailConfirmResponse>(bulidURL('registration/confirm-email'), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  });
};

export const registrationStepThree = (body: RegistrationStepThreeRequest) => {
  return fetchWithCheckResponse(bulidURL('registration/step-three'), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(mapStepThreeRequestToDTO(body)),
    credentials: 'include',
  });
};

export const authenticationRequest = (body: AuthenticationRequest) => {
  return fetchWithCheckResponse<AuthenticationResponce>(bulidURL('auth/login'), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(body),
    credentials: 'include',
  }).then(res => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, res.token);
    return res;
  });
};

export const getProfile = () => {
  return fetchWithRefresh<User>(bulidURL('profile'), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  });
};

export const logoutMe = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS);

  return fetchWithRefresh(bulidURL(`auth/logout`), {
    method: HTTP_METHODS.DELETE,
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  }).then(() => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, '');
    location.reload();
  });
};
