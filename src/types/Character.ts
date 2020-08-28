import { PointLike } from 'types/Common';

export interface CharacterProps {
  initialPosition?: PointLike;
  initialScale?: PointLike;
  initialAngle?: number;
  expression?: string;
  movement?: string;
}

export const DEFAULT_CHARACTER_PROPS = {
  initialScale: 1,
  initialAngle: 0,
};
