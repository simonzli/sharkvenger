import gsap from 'gsap';
import { MovementProps } from 'types';

export const stopAll = async ({ sprite }: MovementProps) => {
  gsap.killTweensOf(sprite);
  gsap.killTweensOf(sprite.transform);
};
