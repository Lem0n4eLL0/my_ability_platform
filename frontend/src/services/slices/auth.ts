import {
  authenticationVerification,
  confirmEmail,
  logoutMe,
  registrationStepOne,
  registrationStepThree,
} from '@/api/api';
import { RequestError, RequestStatus } from '@/api/apiTypes';
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { READY_REQUEST_STATUS } from '@/common/constants';
import { getProfileUser } from './user';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type AuthSteps = 'AuthStepOne' | 'AuthStepTwo' | 'AuthStepThree' | 'AuthCompleted';

type AuthState = {
  stepState: AuthSteps;
  isAuthInitializing: boolean;
  isProfileRegistered: boolean;
  statuses: {
    registrationStepOneStatus: RequestStatus;
    confirmEmailStatus: RequestStatus;
    registrationStepThreeStatus: RequestStatus;
    authenticationVerificationStatus: RequestStatus;
    logoutStatus: RequestStatus;
  };
};

const initialState: AuthState = {
  stepState: 'AuthStepOne',
  isAuthInitializing: true,
  isProfileRegistered: false,
  statuses: {
    registrationStepOneStatus: READY_REQUEST_STATUS,
    confirmEmailStatus: READY_REQUEST_STATUS,
    registrationStepThreeStatus: READY_REQUEST_STATUS,
    authenticationVerificationStatus: READY_REQUEST_STATUS,
    logoutStatus: READY_REQUEST_STATUS,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    authenticationVerification: create.asyncThunk(authenticationVerification, {
      pending: state => {
        state.statuses.authenticationVerificationStatus.status = 'PENDING';
        state.statuses.authenticationVerificationStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.authenticationVerificationStatus.status = 'ERROR';
        state.statuses.authenticationVerificationStatus.error = action.error as RequestError;
        state.stepState = 'AuthStepOne';
        state.isAuthInitializing = true;
      },
      fulfilled: state => {
        state.statuses.authenticationVerificationStatus.status = 'SUCCESS';
        state.statuses.authenticationVerificationStatus.error = undefined;
        state.stepState = 'AuthCompleted';
        state.isAuthInitializing = true;
      },
    }),

    registrationStepOne: create.asyncThunk(registrationStepOne, {
      pending: state => {
        state.statuses.registrationStepOneStatus.status = 'PENDING';
        state.statuses.registrationStepOneStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.registrationStepOneStatus.status = 'ERROR';
        state.statuses.registrationStepOneStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.registrationStepOneStatus.status = 'SUCCESS';
        state.statuses.registrationStepOneStatus.error = undefined;
        state.stepState = 'AuthStepTwo';
      },
    }),

    confirmEmail: create.asyncThunk(confirmEmail, {
      pending: state => {
        state.statuses.confirmEmailStatus.status = 'PENDING';
        state.statuses.confirmEmailStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.confirmEmailStatus.status = 'ERROR';
        state.statuses.confirmEmailStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.confirmEmailStatus.status = 'SUCCESS';
        state.statuses.confirmEmailStatus.error = undefined;
        state.stepState = 'AuthStepThree';
      },
    }),

    registrationStepThree: create.asyncThunk(registrationStepThree, {
      pending: state => {
        state.statuses.registrationStepThreeStatus.status = 'PENDING';
        state.statuses.registrationStepThreeStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.registrationStepThreeStatus.status = 'ERROR';
        state.statuses.registrationStepThreeStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.registrationStepThreeStatus.status = 'SUCCESS';
        state.statuses.registrationStepThreeStatus.error = undefined;
        state.stepState = 'AuthCompleted';
        state.isProfileRegistered = true;
      },
    }),

    logoutMe: create.asyncThunk(logoutMe, {
      pending: state => {
        state.statuses.logoutStatus.status = 'PENDING';
        state.statuses.logoutStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.logoutStatus.status = 'ERROR';
        state.statuses.logoutStatus.error = action.error as RequestError;
      },
      fulfilled: () => initialState,
    }),

    setIsAuthInitializing: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isAuthInitializing = action.payload;
    }),

    backToStepOne: create.reducer(state => {
      state.stepState = 'AuthStepOne';
      (Object.keys(state.statuses) as (keyof typeof state.statuses)[]).forEach(el => {
        state.statuses[el] = READY_REQUEST_STATUS;
      });
      state.isProfileRegistered = false;
    }),
  }),

  extraReducers: builder => {
    builder.addCase(getProfileUser.pending, (state, action) => {
      state.isProfileRegistered = true;
    });
  },

  selectors: {
    selectStepState: store => store.stepState,
    selectIsAuthInitializing: store => store.isAuthInitializing,
    selectIsProfileRegistered: store => store.isProfileRegistered,
    selectIsAuthCompleted: store => store.stepState === 'AuthCompleted',
    selectStatuses: store => store.statuses,
  },
});

export const authReducer = authSlice.reducer;
export const {
  selectStepState,
  selectIsAuthCompleted,
  selectIsAuthInitializing,
  selectIsProfileRegistered,
  selectStatuses: selectStatusesAuth,
} = authSlice.selectors;

export const {
  setIsAuthInitializing,
  backToStepOne,
  logoutMe: logoutMeAuth,
  authenticationVerification: authenticationVerificationAuth,
  registrationStepOne: registrationStepOneAuth,
  confirmEmail: confirmEmailAuth,
  registrationStepThree: registrationStepThreeAuth,
} = authSlice.actions;
