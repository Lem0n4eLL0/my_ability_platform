import { RequestStatus } from '@/api/apiTypes';
import { READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createSlice = buildCreateSlice({
  // потом переместить в общий файл
  creators: { asyncThunk: asyncThunkCreator },
});

type TestsState = {
  statuses: {
    getTasksStatus: RequestStatus;
  };
  data: {
    tests: null;
  };
};

const initialState: TestsState = {
  statuses: {
    getTasksStatus: READY_REQUEST_STATUS,
  },
  data: {
    tests: null,
  },
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: create => ({}),
});

export const testsReduser = testsSlice.reducer;
