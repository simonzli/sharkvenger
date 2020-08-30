import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DirectorState, defaultDirectorState, RootState } from 'types';
import { useInjectReducer } from 'utils/redux-injectors';

const directorSlice = createSlice({
  name: 'director',
  initialState: defaultDirectorState,
  reducers: {
    updateDirector(state: DirectorState, action: PayloadAction<DirectorState>) {
      const { payload } = action;
      state.breakpoint = payload.breakpoint;
      state.line = payload.line;
      state.script = payload.script;
    },
  },
});

export const {
  actions: directorActions,
  reducer: directorReducer,
  name: directorSliceKey,
} = directorSlice;

export const useDirectorReducer = () =>
  useInjectReducer({
    key: directorSliceKey,
    reducer: directorReducer,
  });

export const getDirectorState = (state: RootState) =>
  state.director ?? defaultDirectorState;
