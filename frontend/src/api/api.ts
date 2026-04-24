import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';
import { baseHeaders, bulidURL, fetchWithCheckResponse, fetchWithRefresh } from './apiHelp';
import {
  AuthenticationRequest,
  AuthenticationResponce,
  CheckEmailConfirmResponse,
  ConfirmEmailRequest,
  HTTP_METHODS,
  RefreshTokenResponce,
  RegistrationStepOneRequest,
  RegistrationStepThreeRequest,
  TestResultRequest,
  TestResultsHistoryRequest,
  UserCertificateRequest,
  UserEducationRequest,
  UserProjectRequest,
  UserWorkExperienceRequest,
} from './apiTypes';
import {
  certificateResponseMapper,
  educationResponseMapper,
  mapStepThreeRequestToDTO,
  projectResponseMapper,
  testResultResponseMapper,
  userResponseMapper,
  workExperienceResponseMapper,
} from './dto/schemas';
import {
  UserCertificateDTO,
  UserDTO,
  UserEducationDTO,
  UserProjectDTO,
  UserWorkExperienceDTO,
} from './dto/dto';
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

// Profile
export const getProfile = () => {
  return fetchWithRefresh<UserDTO>(bulidURL('me'), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(userResponseMapper);
};

export type ChangeMainProfileRequest = Partial<Pick<User, 'surname' | 'github' | 'contactPhone'>>;
export type UpdateProfileRequest = Partial<
  Pick<User, 'surname' | 'github' | 'contactPhone' | 'aboutMyself'>
>;

export const updateProfile = (body: UpdateProfileRequest) => {
  return fetchWithRefresh<UserDTO>(bulidURL('me'), {
    method: HTTP_METHODS.PATCH,
    headers: baseHeaders,
    body: JSON.stringify(body),
  }).then(userResponseMapper);
};

// Me Projects

export const createProject = (body: UserProjectRequest) => {
  return fetchWithRefresh<UserProjectDTO>(bulidURL('me/project'), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(body),
  }).then(projectResponseMapper);
};
export const updateProject = (props: { id: string; body: UserProjectRequest }) => {
  return fetchWithRefresh<UserProjectDTO>(bulidURL(`me/project/${props.id}`), {
    method: HTTP_METHODS.PUT,
    headers: baseHeaders,
    body: JSON.stringify(props.body),
  }).then(projectResponseMapper);
};
export const deleteProject = (id: string) => {
  return fetchWithRefresh<UserProjectDTO>(bulidURL(`me/project/${id}`), {
    method: HTTP_METHODS.DELETE,
    headers: baseHeaders,
  }).then(projectResponseMapper);
};

// Me Educations
export const createEducation = (body: UserEducationRequest) => {
  return fetchWithRefresh<UserEducationDTO>(bulidURL('me/education'), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(body),
  }).then(educationResponseMapper);
};
export const updateEducation = (props: { id: string; body: UserEducationRequest }) => {
  return fetchWithRefresh<UserEducationDTO>(bulidURL(`me/education/${props.id}`), {
    method: HTTP_METHODS.PUT,
    headers: baseHeaders,
    body: JSON.stringify(props.body),
  }).then(educationResponseMapper);
};
export const deleteEducation = (id: string) => {
  return fetchWithRefresh<UserEducationDTO>(bulidURL(`me/education/${id}`), {
    method: HTTP_METHODS.PUT,
    headers: baseHeaders,
  }).then(educationResponseMapper);
};

// Me Work Experience
export const createWorkExperience = (body: UserWorkExperienceRequest) => {
  return fetchWithRefresh<UserWorkExperienceDTO>(bulidURL(`me/work-experience`), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(body),
  }).then(workExperienceResponseMapper);
};
export const updateWorkExperience = (props: { id: string; body: UserWorkExperienceRequest }) => {
  return fetchWithRefresh<UserWorkExperienceDTO>(bulidURL(`me/work-experience/${props.id}`), {
    method: HTTP_METHODS.PUT,
    headers: baseHeaders,
    body: JSON.stringify(props.body),
  }).then(workExperienceResponseMapper);
};
export const deleteWorkExperience = (id: string) => {
  return fetchWithRefresh<UserWorkExperienceDTO>(bulidURL(`me/work-experience/${id}`), {
    method: HTTP_METHODS.DELETE,
    headers: baseHeaders,
  }).then(workExperienceResponseMapper);
};

// Me Certificate
export const createCertificate = (body: UserCertificateRequest) => {
  return fetchWithRefresh<UserCertificateDTO>(bulidURL(`me/certificate`), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(body),
  }).then(certificateResponseMapper);
};
export const updateCertificate = (props: { id: string; body: UserCertificateRequest }) => {
  return fetchWithRefresh<UserCertificateDTO>(bulidURL(`me/certificate/${props.id}`), {
    method: HTTP_METHODS.PUT,
    headers: baseHeaders,
    body: JSON.stringify(props.body),
  }).then(certificateResponseMapper);
};
export const deleteCertificate = (id: string) => {
  return fetchWithRefresh<UserCertificateDTO>(bulidURL(`me/certificate/${id}`), {
    method: HTTP_METHODS.DELETE,
    headers: baseHeaders,
  }).then(certificateResponseMapper);
};

// Tests
export const getTestsResult = () => {
  return fetchWithRefresh<TestResultRequest>(bulidURL(`me/tests-result`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => res.testsResult.map(testResultResponseMapper));
};

export const getTestResultsHistory = (testId: string) => {
  return fetchWithRefresh<TestResultsHistoryRequest>(
    bulidURL(`me/test-results/history/${testId}`),
    {
      method: HTTP_METHODS.GET,
      headers: baseHeaders,
    }
  ).then(res => res.testResults.map(testResultResponseMapper));
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

// tests

export const getTests = () => {
  return fetchWithRefresh(bulidURL(`tests`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  });
};
