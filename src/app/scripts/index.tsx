import { Character } from './characters';

export interface Setting {
  character: Character;
  position?: 'left' | 'right' | 'middle'; // 'left' by default
}

export interface Line {
  character?: Character;
  expression?: string;
  movements?: string[];
  position?: 'left' | 'right' | 'middle'; // Previous position by default
  text?: string;
}

export type Script = {
  initialSetting: Setting[];
  lines: Line[][];
};

export const intro: Script = {
  initialSetting: [
    { character: Character.MommyShark },
    { character: Character.Suica, position: 'right' },
  ],
  lines: [
    [
      {
        character: Character.MommyShark,
        movements: ['!shake'],
        text:
          'Somebody kidnapped my baby while I was doing home schooling. Would you help me find him?',
      },
      {
        character: Character.Suica,
        movements: ['!shake'],
      },
    ],
    [
      {
        character: Character.Suica,
        text: 'Of course!',
        movements: ['shake'],
      },
    ],
    [
      {
        character: Character.MommyShark,
        movements: ['shake'],
        text: 'Thank you!!!',
      },
      {
        character: Character.Suica,
        movements: ['active', 'shake'],
      },
    ],
  ],
};
