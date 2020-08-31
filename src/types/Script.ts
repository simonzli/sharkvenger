import { Character } from 'app/scripts/characters';
import { MovementProps } from './Common';

export type Movement =
  | ((props: MovementProps) => Promise<void> | void)
  | Movement[];

export interface Setting {
  character: Character;
  position?: 'left' | 'right' | 'middle'; // 'left' by default
  movements?: Movement[];
}

export interface Line {
  id: string;
  mainCharacter?: Character;
  noActiveDetection?: boolean;
  autoNext?: boolean;
  settings: Setting[];
  text?: string;
}

export interface Script {
  id: string;
  lines: Line[];
  jumpTo?: {
    script: string;
    lineId?: string; // The first line by default
  };
}
