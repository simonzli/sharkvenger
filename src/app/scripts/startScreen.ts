import { Script } from 'types';
import { SharkMovements } from 'app/characters/movements';
import { Character } from './characters';
import { INTRO_ID } from './intro';

const { MommyShark } = Character;

const START_SCREEN_ID = 'startScreen';

export const startScreen: Script = {
  id: START_SCREEN_ID,
  jumpTo: {
    script: INTRO_ID,
  },
  lines: [
    {
      id: '0',
      noActiveDetection: true,
      autoNext: true,
      settings: [
        {
          character: MommyShark,
          movements: [SharkMovements.initialScene],
        },
      ],
    },
    {
      id: '1',
      mainCharacter: MommyShark,
      noActiveDetection: true,
      text: 'WHERE IS MY BABY SHARK!!!',
      settings: [],
    },
  ],
};
