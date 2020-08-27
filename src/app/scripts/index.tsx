import { Character } from './characters';

export interface Setting {
  character: Character;
  position?: 'left' | 'right' | 'middle'; // 'left' by default
}

export interface Line {
  character?: Character;
  expression?: string;
  position?: 'left' | 'right' | 'middle'; // Previous position by default
  text?: string;
}

export type Script = {
  initialSetting: Setting[];
  lines: Line[];
};

export const intro: Script = {
  initialSetting: [
    { character: Character.MommyShark },
    { character: Character.Suica, position: 'right' },
  ],
  lines: [
    {
      character: Character.MommyShark,
      text:
        'Somebody kidnapped my baby while I was doing home schooling. Would you help me find him?',
    },
    {
      character: Character.Suica,
      text: 'Of course!',
    },
  ],
};
