import { getProfile } from '@/api/api';
import { RequestError, RequestStatus } from '@/api/apiTypes';
import { User } from '@/common/commonTypes';
import { READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { registrationStepOneAuth } from './auth';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type UserState = {
  statuses: {
    getProfile: RequestStatus;
  };
  data: {
    email: string | null;
    user: User | null;
  };
};

const initialState: UserState = {
  statuses: {
    getProfile: READY_REQUEST_STATUS,
  },
  data: {
    email: null,
    user: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: create => ({
    getProfile: create.asyncThunk(getProfile, {
      pending: state => {
        state.statuses.getProfile.status = 'PENDING';
        state.statuses.getProfile.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getProfile.status = 'ERROR';
        state.statuses.getProfile.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getProfile.status = 'SUCCESS';
        state.statuses.getProfile.error = undefined;
        state.data.user = action.payload;
      },
    }),
  }),

  extraReducers: builder => {
    builder.addCase(registrationStepOneAuth.pending, (state, action) => {
      state.data.email = action.meta.arg.email;
    });
  },

  selectors: {
    selectData: store => store.data,
    selectEmail: store => store.data.email,
    selectStatuses: store => store.statuses,
  },
});

export const userReduser = userSlice.reducer;

export const { getProfile: getProfileUser } = userSlice.actions;

export const { selectData, selectEmail, selectStatuses: selectStatusesUser } = userSlice.selectors;
