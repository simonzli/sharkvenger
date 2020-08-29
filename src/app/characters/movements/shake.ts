import gsap from 'gsap';
import { DEG_TO_RAD } from 'pixi.js';

export const SHAKE_ANGLE = 10;

export const shake = async (g: PIXI.Sprite, speed = 0.5, initialAngle = 0) => {
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
