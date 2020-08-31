import gsap from 'gsap';
import { DEG_TO_RAD } from 'pixi.js';

import { MovementProps } from 'types';

export const SHAKE_ANGLE = 10;

export const shake = async ({
  sprite,
  speed = 0.5,
  initialValues,
}: MovementProps) => {
  const g = sprite;
  const initialAngle = initialValues?.initialAngle ?? 0;

  try {
    const timeline = gsap.timeline({ immediateRender: false });
    timeline.to(g.transform, {
      rotation: DEG_TO_RAD * (-SHAKE_ANGLE + initialAngle),
      duration: speed / 2,
      ease: 'power2.inOut',
    });

    timeline.to(g.transform, {
      rotation: DEG_TO_RAD * (SHAKE_ANGLE + initialAngle),
      duration: speed,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      onRepeat() {
        if (!this._targets[0]) this.kill();
      },
      onInterrupt() {
        if (g) {
          gsap.to(g.transform, {
            rotation: DEG_TO_RAD * initialAngle,
            duration: 0.25,
            ease: 'power2.inOut',
          });
        }
      },
    });

    timeline.play();
  } catch (err) {
    console.error(err);
  }
};

export const stopShaking = ({ sprite }: MovementProps) => {
  gsap.killTweensOf(sprite.transform, 'rotation');
};
