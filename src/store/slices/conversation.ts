import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ConversationState, defaultConversationState, RootState } from 'types';
import { useInjectReducer } from 'utils/redux-injectors';

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

export const useConversationReducer = () =>
  useInjectReducer({
    key: conversationSliceKey,
    reducer: conversationReducer,
  });

export const getConversationState = (state: RootState) =>
  state.conversation ?? defaultConversationState;
