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

  gsap.to(g, {
    pixi: {
      tint: reversed ? 0x999999 : 0xffffff,
    },
    duration: 0.5,
    ease: 'power2.inOut',
  });
  await tween.play();

  tween.kill();
};
