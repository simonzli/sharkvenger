import gsap from 'gsap';

import { MovementProps } from 'types';

export const ACTIVE_SHIFT = 40;

export const getActiveMovement = (reversed = false) => async ({
  sprite,
  initialValues,
}: MovementProps) => {
  if (!initialValues) return;
  const { initialPosition } = initialValues;
  if (!initialPosition) return;
  const tween = gsap.to(sprite.position, {
    y: reversed ? initialPosition[1] : initialPosition[1] - ACTIVE_SHIFT,
    duration: 0.5,
    ease: 'power2.inOut',
    immediateRender: false,
  });

  gsap.to(sprite, {
    pixi: {
      tint: reversed ? 0x999999 : 0xffffff,
    },
    duration: 0.5,
    ease: 'power2.inOut',
  });
  await tween.play();

  tween.kill();
};

export const active = getActiveMovement();
export const inactive = getActiveMovement(true);
