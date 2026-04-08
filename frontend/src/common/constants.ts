import { RequestStatus } from '@/api/apiTypes';

export const LOCAL_STORAGE_ACCESS_TOKEN_ALIAS = 'accessToken';

//
export const READY_REQUEST_STATUS: RequestStatus = {
  status: 'READY',
  error: undefined,
};

// RegExp
export const PASSWORD_REGEX: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// validation error

export const VALIDATION_ERROR = {
  NOT_EMPTY: 'Поле не может быть пустым',
};
