import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type MainPageState = {
  test: boolean;
};

const initialState: MainPageState = {
  test: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const appReduser = appSlice.reducer;
