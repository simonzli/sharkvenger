import gsap from 'gsap';

import { ObjectScale } from 'types';

export const ACTIVE_SHIFT = 40;

export const active = async (
  g: PIXI.Sprite,
  initialPosition: ObjectScale,
  reversed = false,
) => {
  const tween = gsap.to(g.position, {
    y: reversed ? initialPosition.y : initialPosition.y - ACTIVE_SHIFT,
    duration: 0.5,
    ease: 'power2.inOut',
    immediateRender: false,
  });

  g.tint = reversed ? 0x999999 : 0xffffff;
  g.zIndex = reversed ? 1 : 1000;
  await tween.play();

  tween.kill();
};
