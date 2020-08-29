import gsap from 'gsap';

import { Scale, CharacterProps } from 'types';
import { multiplyScale, convertScaleToObject } from 'utils';
import * as movements from 'app/characters/movements';

export const setUpSprite = (
  sprite: PIXI.Sprite,
  diff?: CharacterProps,
  initialValues: CharacterProps = {},
  initAll = false,
) => {
  if (!sprite || !diff) return;
  if (initAll || diff.initialScale !== undefined) {
    let scale = convertScaleToObject(
      initialValues.initialScale ?? { x: 1, y: 1 },
    );
    if (diff.initialScale) {
      const propScale = diff.initialScale.valueOf() as Scale;
      scale = multiplyScale(scale, propScale);
    }
    sprite.scale.set(scale.x, scale.y);
  }

  if (initAll || diff.initialAngle !== undefined) {
    sprite.angle = (initialValues.initialAngle ?? 0) + (diff.initialAngle ?? 0);
  }

  const initialPosition = convertScaleToObject(
    initialValues.initialPosition ?? { x: 0, y: 0 },
  );
  if (initAll || diff.initialPosition !== undefined) {
    sprite.position.set(initialPosition.x, initialPosition.y);
  }

  if (initAll) sprite.anchor.set(0.5, 0.5);

  const diffMovements = diff.movements ?? [];

  if (diffMovements.includes('active')) {
    movements.active(sprite, initialPosition);
  } else if (diffMovements.includes('!active')) {
    movements.active(sprite, initialPosition, true);
  }

  if (diffMovements.includes('shake')) {
    movements.shake(sprite, 0.5, initialValues.initialAngle);
  } else if (diffMovements.includes('!shake')) {
    gsap.killTweensOf(sprite.transform, 'rotation');
  }
};
