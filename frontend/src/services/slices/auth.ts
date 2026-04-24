import {
  authenticationRequest,
  checkEmailConfirm,
  confirmEmail,
  logoutMe,
  registrationStepOne,
  registrationStepThree,
} from '@/api/api';
import { AuthenticationRequest, RequestError, RequestStatus } from '@/api/apiTypes';
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { READY_REQUEST_STATUS, RESPONSE_ERRORS } from '@/common/constants';
import { getProfileUser } from './user';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

// type AuthSteps = 'AuthStepOne' | 'AuthStepTwo' | 'AuthCompleted';

type AuthState = {
  isAuthInitializing: boolean;
  isProfileRegistered: boolean;
  isUserAuthenticated: boolean;
  isEmailConfirm: boolean;
  statuses: {
    registrationStepOneStatus: RequestStatus;
    checkEmailConfirmStatus: RequestStatus;
    confirmEmailStatus: RequestStatus;
    registrationStepThreeStatus: RequestStatus;
    authenticationStatus: RequestStatus;
    logoutStatus: RequestStatus;
  };
};

const initialState: AuthState = {
  isAuthInitializing: true,
  isProfileRegistered: false,
  isUserAuthenticated: false,
  isEmailConfirm: false,
  statuses: {
    registrationStepOneStatus: READY_REQUEST_STATUS,
    checkEmailConfirmStatus: READY_REQUEST_STATUS,
    confirmEmailStatus: READY_REQUEST_STATUS,
    registrationStepThreeStatus: READY_REQUEST_STATUS,
    authenticationStatus: READY_REQUEST_STATUS,
    logoutStatus: READY_REQUEST_STATUS,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    authentication: create.asyncThunk(
      async (body: AuthenticationRequest, { dispatch, rejectWithValue }) => {
        try {
          const authResponse = await authenticationRequest(body);
          await dispatch(getProfileUser()).catch(e => console.log('getProfileUser', e));

          return authResponse;
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      {
        pending: state => {
          state.statuses.authenticationStatus.status = 'PENDING';
          state.statuses.authenticationStatus.error = undefined;
        },
        rejected: (state, action) => {
          state.statuses.authenticationStatus.status = 'ERROR';
          state.statuses.authenticationStatus.error = action.error as RequestError;
        },
        fulfilled: state => {
          state.statuses.authenticationStatus.status = 'SUCCESS';
          state.statuses.authenticationStatus.error = undefined;
          state.isUserAuthenticated = true;
        },
      }
    ),

    registrationStepOne: create.asyncThunk(registrationStepOne, {
      pending: state => {
        state.statuses.registrationStepOneStatus.status = 'PENDING';
        state.statuses.registrationStepOneStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.registrationStepOneStatus.status = 'ERROR';
        state.statuses.registrationStepOneStatus.error = action.error as RequestError;
      },
      fulfilled: state => {
        state.statuses.registrationStepOneStatus.status = 'SUCCESS';
        state.statuses.registrationStepOneStatus.error = undefined;
      },
    }),

    checkEmailConfirm: create.asyncThunk(checkEmailConfirm, {
      pending: state => {
        state.statuses.checkEmailConfirmStatus.status = 'PENDING';
        state.statuses.checkEmailConfirmStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.checkEmailConfirmStatus.status = 'ERROR';
        state.statuses.checkEmailConfirmStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        if (action.payload.isConfirm) {
          state.statuses.checkEmailConfirmStatus.status = 'SUCCESS';
          state.statuses.checkEmailConfirmStatus.error = undefined;
          state.isEmailConfirm = true;
          state.isUserAuthenticated = true;
        } else {
          state.statuses.checkEmailConfirmStatus = READY_REQUEST_STATUS;
        }
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
      fulfilled: state => {
        state.statuses.confirmEmailStatus.status = 'SUCCESS';
        state.statuses.confirmEmailStatus.error = undefined;
        state.isUserAuthenticated = true;
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
      fulfilled: state => {
        state.statuses.registrationStepThreeStatus.status = 'SUCCESS';
        state.statuses.registrationStepThreeStatus.error = undefined;
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

    setIsEmailConfirm: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isEmailConfirm = action.payload;
    }),
  }),

  extraReducers: builder => {
    builder
      .addCase(getProfileUser.rejected, (state, action) => {
        state.isAuthInitializing = false;
        state.isProfileRegistered = false;
        const error = action.payload as RequestError;
        if (error.errorCode === RESPONSE_ERRORS.REFRESH_TOKEN_EXPIRED) {
          state.isUserAuthenticated = false;
        } else if (error.errorCode === RESPONSE_ERRORS.PROFILE_NOT_REGISTERED) {
          state.isUserAuthenticated = true;
        }
      })
      .addCase(getProfileUser.fulfilled, state => {
        state.isAuthInitializing = false;
        state.isUserAuthenticated = true;
        state.isProfileRegistered = true;
      });
  },

  selectors: {
    selectIsAuthInitializing: store => store.isAuthInitializing,
    selectIsProfileRegistered: store => store.isProfileRegistered,
    selectIsEmailConfirm: store => store.isEmailConfirm,
    selectIsUserAuthenticated: store => store.isUserAuthenticated,
    selectStatuses: store => store.statuses,
  },
});

export const authReducer = authSlice.reducer;
export const {
  selectIsUserAuthenticated,
  selectIsAuthInitializing,
  selectIsProfileRegistered,
  selectIsEmailConfirm,
  selectStatuses: selectStatusesAuth,
} = authSlice.selectors;

export const {
  setIsAuthInitializing,
  setIsEmailConfirm,
  logoutMe: logoutMeAuth,
  authentication: authenticationAuth,
  checkEmailConfirm: checkEmailConfirmAuth,
  registrationStepOne: registrationStepOneAuth,
  confirmEmail: confirmEmailAuth,
  registrationStepThree: registrationStepThreeAuth,
} = authSlice.actions;
