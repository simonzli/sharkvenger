import { Script } from 'types';

export const TRANSITION_ID = 'TRANSITION';

export const isTransitionScript = (script: string) =>
  script.startsWith(`${TRANSITION_ID}\\`);

export const getTransitionScriptId = (script: string, line?: string) =>
  `${TRANSITION_ID}\\${script}\\${line}`;

export const generateTransition = (script: string, line?: string): Script => ({
  id: getTransitionScriptId(script, line),
  jumpTo: {
    script,
    lineId: line,
  },
  lines: [
    {
      id: '0',
      autoNext: true,
      settings: [],
    },
  ],
});
