import { getTests } from '@/api/api';
import { GetTestsRequest, PaginationResponse, RequestError, RequestStatus } from '@/api/apiTypes';
import { Test } from '@/common/commonTypes';
import { PAGINATION_RESPONSE_PARAMS_BASE, READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createSlice = buildCreateSlice({
  // потом переместить в общий файл
  creators: { asyncThunk: asyncThunkCreator },
});

type TestsState = {
  statuses: {
    getTestsStatus: RequestStatus;
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

export const testsReduser = testsSlice.reducer;

export const { getTests: getTestsTests, getMoreTests: getMoreTestsTests } = testsSlice.actions;

export const {
  selectData: selectDataTests,
  selectTests: selectTests,
  selectStatuses: selectStatusesTests,
} = testsSlice.selectors;
