import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DetectorState, defaultDetectorState } from 'types';

const detectorSlice = createSlice({
  name: 'detector',
  initialState: defaultDetectorState,
  reducers: {
    updateDetector(state: DetectorState, action: PayloadAction<DetectorState>) {
      const { payload } = action;
      state.showSharkDetector = payload.showSharkDetector;
      state.targetGeolocation = payload.targetGeolocation;
    },
  },
});

export const {
  actions: detectorActions,
  reducer: detectorReducer,
  name: detectorSliceKey,
} = detectorSlice;
