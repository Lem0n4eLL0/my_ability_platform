import { getTest, getTestInformation, getTests } from '@/api/api';
import { GetTestsRequest, PaginationResponse, RequestError, RequestStatus } from '@/api/apiTypes';
import { Test } from '@/common/commonTypes';
import { PAGINATION_RESPONSE_PARAMS_BASE, READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type TestsState = {
  statuses: {
    getTestsStatus: RequestStatus;
    getTestStatus: RequestStatus;
    getTestInformationStatus: RequestStatus;
    getMoreTestsStatus: RequestStatus;
  };
  data: {
    tests: {
      pagination: PaginationResponse;
      data: Array<Test>;
    };
  };
};

const initialState: TestsState = {
  statuses: {
    getTestsStatus: READY_REQUEST_STATUS,
    getTestStatus: READY_REQUEST_STATUS,
    getTestInformationStatus: READY_REQUEST_STATUS,
    getMoreTestsStatus: READY_REQUEST_STATUS,
  },
  data: {
    tests: {
      pagination: PAGINATION_RESPONSE_PARAMS_BASE,
      data: [],
    },
  },
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: create => ({
    getTests: create.asyncThunk(
      (params: GetTestsRequest) =>
        getTests({
          filters: params.filters,
          pagination: PAGINATION_RESPONSE_PARAMS_BASE,
        }),
      {
        pending: state => {
          state.statuses.getTestsStatus.status = 'PENDING';
          state.statuses.getTestsStatus.error = undefined;
        },
        rejected: (state, action) => {
          state.statuses.getTestsStatus.status = 'ERROR';
          state.statuses.getTestsStatus.error = action.error as RequestError;
        },
        fulfilled: (state, action) => {
          state.statuses.getTestsStatus.status = 'SUCCESS';
          state.statuses.getTestsStatus.error = undefined;
          state.data.tests.pagination = {
            ...action.payload.pagination,
            offset: action.payload.pagination.offset + action.payload.pagination.limit,
          };
          state.data.tests.data = action.payload.tests;
        },
      }
    ),
    getTest: create.asyncThunk(getTest, {
      pending: state => {
        state.statuses.getTestStatus.status = 'PENDING';
        state.statuses.getTestStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getTestStatus.status = 'ERROR';
        state.statuses.getTestStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getTestStatus.status = 'SUCCESS';
        state.statuses.getTestStatus.error = undefined;
        const ind = state.data.tests.data.findIndex(el => el.id === action.payload.id);
        if (ind !== -1) {
          state.data.tests.data[ind] = action.payload;
        } else {
          state.data.tests.data.push(action.payload);
        }
      },
    }),
    getTestInformation: create.asyncThunk(getTestInformation, {
      pending: state => {
        state.statuses.getTestInformationStatus.status = 'PENDING';
        state.statuses.getTestInformationStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getTestInformationStatus.status = 'ERROR';
        state.statuses.getTestInformationStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getTestInformationStatus.status = 'SUCCESS';
        state.statuses.getTestInformationStatus.error = undefined;
        const ind = state.data.tests.data.findIndex(el => el.id === action.payload.test.id);
        if (ind !== -1) {
          state.data.tests.data[ind] = action.payload.test;
        } else {
          state.data.tests.data.push(action.payload.test);
        }
      },
    }),
    getMoreTests: create.asyncThunk(getTests, {
      pending: state => {
        state.statuses.getMoreTestsStatus.status = 'PENDING';
        state.statuses.getMoreTestsStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getMoreTestsStatus.status = 'ERROR';
        state.statuses.getMoreTestsStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getMoreTestsStatus.status = 'SUCCESS';
        state.statuses.getMoreTestsStatus.error = undefined;
        state.data.tests.pagination = {
          ...action.payload.pagination,
          offset: action.payload.pagination.offset + action.payload.pagination.limit,
        };
        state.data.tests.data.push(...action.payload.tests);
      },
    }),
  }),
  selectors: {
    selectData: store => store.data,
    selectTests: store => store.data.tests,
    selectStatuses: store => store.statuses,
  },
});

const SelectTestsState = (state: RootState) => state.tests;

export const selectTest = (testId: string) =>
  createSelector([SelectTestsState], state => {
    return state.data.tests.data.find(el => el.id === testId);
  });

export const testsReduser = testsSlice.reducer;

export const {
  getTests: getTestsTests,
  getTest: getTestTests,
  getTestInformation: getTestInformationTests,
  getMoreTests: getMoreTestsTests,
} = testsSlice.actions;

export const {
  selectData: selectDataTests,
  selectTests: selectTests,
  selectStatuses: selectStatusesTests,
} = testsSlice.selectors;
