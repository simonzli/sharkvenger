import { Script } from 'types';
import { active, shake, stopShaking } from 'app/characters/movements';
import { Character } from './characters';

const { MommyShark, Suica } = Character;

export const INTRO_ID = 'intro';

export const intro: Script = {
  id: INTRO_ID,
  jumpTo: {
    script: 'startScreen',
  },
  lines: [
    {
      id: '0',
      mainCharacter: MommyShark,
      text:
        'Somebody kidnapped my baby while I was doing home schooling. Would you help me find him?',
      settings: [
        {
          character: MommyShark,
          position: 'left',
          movements: [active, stopShaking],
        },
        {
          character: Suica,
          position: 'right',
          movements: [stopShaking],
        },
      ],
    },
    {
      id: '1',
      mainCharacter: Suica,
      text: 'Of course!',
      settings: [
        {
          character: Suica,
          movements: [shake],
        },
      ],
    },
    {
      id: '2',
      mainCharacter: MommyShark,
      text: 'Thank you!!!',
      settings: [
        {
          character: MommyShark,
          movements: [shake],
        },
        {
          character: Suica,
          movements: [active],
        },
      ],
    },
  ],
};
