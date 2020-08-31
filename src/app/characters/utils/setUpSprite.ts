import { Scale, CharacterProps } from 'types';
import { multiplyScale, convertScaleToObject } from 'utils';

export const setUpSprite = (
  sprite: PIXI.Sprite,
  diff?: CharacterProps,
  initialValues: CharacterProps = {},
  initAll = false,
) => {
  if (!sprite || !diff) return;
  const initial = initialValues;
  if (initAll || diff.initialScale !== undefined) {
    let scale = convertScaleToObject(
      initialValues.initialScale ?? { x: 1, y: 1 },
    );
    if (diff.initialScale) {
      const propScale = diff.initialScale.valueOf() as Scale;
      scale = multiplyScale(scale, propScale);
    }
    sprite.scale.set(scale.x, scale.y);
    initial.initialScale = scale;
  }

  if (initAll || diff.initialAngle !== undefined) {
    sprite.angle = (initialValues.initialAngle ?? 0) + (diff.initialAngle ?? 0);
    initial.initialAngle = sprite.angle;
  }

  const initialPosition = convertScaleToObject(
    initialValues.initialPosition ?? { x: 0, y: 0 },
  );
  if (initAll) {
    sprite.position.set(initialPosition.x, initialPosition.y);
  }
  if (diff.initialPosition !== undefined) {
    const diffPosition = convertScaleToObject(diff.initialPosition);
    sprite.position.set(diffPosition.x, diffPosition.y);
  }
  initial.initialPosition = [sprite.position.x, sprite.position.y];

  if (initAll) sprite.anchor.set(0.5, 0.5);

  return initial;
};
