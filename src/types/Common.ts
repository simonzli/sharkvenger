import { Dispatch } from 'redux';
import { CharacterProps } from './Character';
import { Character } from 'app/scripts';

export type ArrayScale = [number, number];
export type ObjectScale = { x: number; y: number };
export type Scale = number | [number] | ObjectScale | ArrayScale;
export type PointLike = Scale;

export type MovementProps = {
  sprite: PIXI.Sprite;
  dispatch: Dispatch;
  pixiApp: PIXI.Application;
  initialValues?: CharacterProps;
  speed?: number;
  character?: Character;
};
