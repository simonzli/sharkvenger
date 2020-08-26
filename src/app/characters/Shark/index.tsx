import React from 'react';
import { Sprite, useApp, _ReactPixi } from '@inlet/react-pixi';

import { getResource } from 'utils';

type Scale = number | { x: number; y: number } | [number, number];

export default function Shark(props?: Partial<_ReactPixi.ISprite>) {
  const app = useApp();
  let scale: Scale = Math.min(0.5, app.screen.width / 1500);
  if (props && props.scale) {
    const propScale = props.scale.valueOf() as Scale;
    if (typeof propScale === 'number') {
      scale *= propScale;
    } else if (Array.isArray(propScale)) {
      scale = [propScale[0] * scale, propScale[1] * scale];
    } else {
      scale = {
        x: scale * propScale.x,
        y: scale * propScale.y,
      };
    }
  }

  return (
    <Sprite
      image={getResource('shark.png')}
      anchor={0.5}
      {...props}
      scale={scale}
    />
  );
}
