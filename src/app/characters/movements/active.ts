import gsap from 'gsap';

import { ObjectScale } from 'types';

export const ACTIVE_SHIFT = 40;

export const active = async (
  g: PIXI.Sprite,
  initialPosition: ObjectScale,
  reversed = false,
) => {
  const tween = gsap.to(g, {
    pixi: {
      tint: reversed ? 0x999999 : 0xffffff,
      zIndex: reversed ? 1 : 1000,
      y: reversed ? initialPosition.y : initialPosition.y - ACTIVE_SHIFT,
    },
    duration: 0.5,
    ease: 'power2.inOut',
    immediateRender: false,
  });
  await tween.play();

  tween.kill();
};
