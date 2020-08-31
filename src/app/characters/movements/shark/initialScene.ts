import gsap from 'gsap';
import { MovementProps } from 'types';
import { convertScaleToObject } from 'utils';

export const SHARK_INITIAL_SCENE_DURATION = 20.4;
export const initialScene = async ({
  sprite,
  initialValues,
  pixiApp,
}: MovementProps) => {
  const initialScale = convertScaleToObject(
    initialValues?.initialScale ?? { x: 1, y: 1 },
  );
  const { width = 600, height = 800 } = pixiApp?.screen ?? {};

  const timeline = gsap.timeline();
  let time = 0;
  timeline.fromTo(
    sprite,
    {
      pixi: {
        x: width,
        y: 100,
        scaleY: -initialScale.y,
        angle: 135,
      },
    },
    {
      pixi: {
        x: 10,
        y: height - 40,
      },
      duration: 2,
      delay: 1,
    },
    time,
  );
  time += 3;
  timeline.to(
    sprite,
    {
      pixi: { angle: -45, scaleY: initialScale.y },
      duration: 0,
    },
    time,
  );
  timeline.to(
    sprite,
    {
      pixi: { x: 10, y: 100, angle: 45 },
      duration: 2,
      delay: 1,
    },
    time,
  );
  time += 3;
  timeline.to(
    sprite,
    {
      pixi: { x: width, y: height - 40 },
      duration: 2,
      delay: 1,
    },
    time,
  );
  time += 3;
  timeline.to(
    sprite,
    {
      pixi: { angle: 225, scaleY: -initialScale.y },
      duration: 0,
    },
    time,
  );
  timeline.to(
    sprite,
    {
      pixi: { x: width / 2, y: height / 2 },
      duration: 1,
      delay: 1,
    },
    time,
  );
  time += 2;
  timeline.to(
    sprite,
    {
      pixi: { angle: -135 },
      duration: 2,
      ease: 'power4.inOut',
    },
    time,
  );
  time += 2;
  timeline.to(
    sprite,
    {
      pixi: { angle: -45, scaleY: initialScale.y },
      duration: 0,
    },
    time,
  );
  timeline.to(
    sprite,
    {
      pixi: { angle: 315 },
      duration: 2,
      delay: 1,
      ease: 'power4.inOut',
    },
    time,
  );
  time += 3;
  timeline.to(
    sprite,
    {
      pixi: { angle: -135, scaleY: -initialScale.y },
      duration: 0,
    },
    time,
  );
  timeline.to(
    sprite,
    {
      duration: 0,
      delay: 1,
    },
    time,
  );
  time += 1;
  timeline.to(
    sprite,
    {
      pixi: { angle: -495 },
      repeat: 7,
      duration: 0.3,
      ease: 'none',
    },
    time,
  );
  timeline.to(
    sprite,
    {
      pixi: { y: height + sprite.getBounds().width },
      duration: 2.1,
    },
    time,
  );
  time += 2.1;

  timeline.to(
    sprite,
    {
      pixi: {
        scaleX: initialScale.x * 1.3,
        scaleY: -initialScale.y * 1.3,
        x: width / 2 + 10,
        angle: -80,
      },
      duration: 0.5,
    },
    time,
  );
  time += 0.5;
  timeline.to(
    sprite,
    {
      pixi: { y: height - 180 },
      duration: 0.8,
    },
    time,
  );
  await timeline.play();
};
