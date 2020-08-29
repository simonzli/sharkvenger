import gsap from 'gsap';

export const SHAKE_ANGLE = 10;

export const shake = async (g: PIXI.Sprite, speed = 0.5, initialAngle = 0) => {
  try {
    const timeline = gsap.timeline({ immediateRender: false });
    timeline.to(g, {
      angle: -SHAKE_ANGLE + initialAngle,
      duration: speed / 2,
      ease: 'power2.inOut',
    });

    timeline.to(g, {
      angle: SHAKE_ANGLE + initialAngle,
      duration: speed,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      onInterrupt() {
        gsap.to(g, {
          angle: initialAngle,
          duration: 0.25,
          ease: 'power2.inOut',
        });
      },
    });

    timeline.play();
  } catch (err) {
    console.error(err);
  }
};
