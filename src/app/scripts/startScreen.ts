import { Script } from 'types';
import { SharkMovements } from 'app/characters/movements';
import { getDelayString as delay } from 'utils';
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
      id: 'b',
      mainCharacter: MommyShark,
      noActiveDetection: true,
      text:
        'This is such a nice day. It’s so nice that uncle shark, auntie shark, sharkie bruh, and sister shark are all going off to college together.',
      settings: [
        {
          character: MommyShark,
          movements: [SharkMovements.initialSceneA],
        },
      ],
    },
    {
      id: 'c',
      mainCharacter: MommyShark,
      noActiveDetection: true,
      text:
        'Oh wait, I needa find my son Baby Shark first. I wonder how that rascal’s getting along with his college life.',
      settings: [
        {
          character: MommyShark,
          movements: [SharkMovements.initialSceneA],
        },
      ],
    },
    {
      id: '0',
      noActiveDetection: true,
      autoNext: true,
      settings: [
        {
          character: MommyShark,
          movements: [SharkMovements.initialSceneB],
        },
      ],
    },
    {
      id: '1',
      mainCharacter: MommyShark,
      noActiveDetection: true,
      text: `WHERE${delay(500)} IS${delay(500)} MY${delay(500)} B${delay(
        200,
      )}A${delay(200)}B${delay(200)}Y${delay(500)} S${delay(200)}H${delay(
        200,
      )}A${delay(200)}R${delay(200)}K${delay(200)}!!!`,
      settings: [
        {
          character: MommyShark,
          movements: [SharkMovements.initialSceneC],
        },
      ],
    },
  ],
};
