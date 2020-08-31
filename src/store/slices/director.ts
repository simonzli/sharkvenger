import { PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DirectorState, defaultDirectorState, RootState } from 'types';

const directorSlice = createSlice({
  name: 'director',
  initialState: defaultDirectorState,
  reducers: {
    updateDirector(state: DirectorState, action: PayloadAction<DirectorState>) {
      const { payload } = action;
      state.breakpoint = payload.breakpoint;
      state.line = payload.line;
      state.script = payload.script;
      if (payload.readyCount !== undefined) {
        state.readyCount = payload.readyCount;
      }
    },
    ready(state: DirectorState) {
      state.readyCount = (state.readyCount ?? 0) + 1;
    },
    readyAt(state: DirectorState, action: PayloadAction<number>) {
      const count = action.payload;
      state.readyCount = count;
    },
  },
});

export const {
  actions: directorActions,
  reducer: directorReducer,
  name: directorSliceKey,
} = directorSlice;

export const getDirectorState = (state: RootState) =>
  state.director ?? defaultDirectorState;

export const getScriptLine = createSelector(getDirectorState, state => ({
  script: state.script,
  line: state.line,
}));
