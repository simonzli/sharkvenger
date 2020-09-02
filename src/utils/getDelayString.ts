import { CONVERSATION_DELAY_IDENTIFIER } from 'app/scripts/constants';

export const getDelayString = (delay_ms: number) =>
  `${CONVERSATION_DELAY_IDENTIFIER}${delay_ms}]`;
