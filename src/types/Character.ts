import { PointLike, ArrayScale } from 'types/Common';
import { Movement } from './Script';

export interface CharacterProps {
  initialPosition?: ArrayScale;
  initialScale?: PointLike;
  initialAngle?: number;
  expression?: string;
  movements?: Movement[];
}

export const DEFAULT_CHARACTER_PROPS = {
  initialScale: 1,
  initialAngle: 0,
};
