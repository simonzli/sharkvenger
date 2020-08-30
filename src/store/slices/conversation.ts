import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ConversationState, defaultConversationState, RootState } from 'types';

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: defaultConversationState,
  reducers: {
    updateConversation(
      state: ConversationState,
      action: PayloadAction<ConversationState>,
    ) {
      const { payload } = action;
      state.name = payload.name;
      state.namePosition = payload.namePosition ?? 'left';
      state.showConversationBox = payload.showConversationBox;
      state.text = payload.text;
    },
  },
});

export const {
  actions: conversationActions,
  reducer: conversationReducer,
  name: conversationSliceKey,
} = conversationSlice;

export const getConversationState = (state: RootState) =>
  state.conversation ?? defaultConversationState;
