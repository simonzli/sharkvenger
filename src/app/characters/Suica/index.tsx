import React from 'react';
import { Sprite, useApp, _ReactPixi } from '@inlet/react-pixi';

import { Scale } from 'types';
import { getResource, convertScaleToArray, multiplyScale } from 'utils';

export default function Suica(props?: Partial<_ReactPixi.ISprite>) {
  const app = useApp();
  let scale = convertScaleToArray(Math.min(0.5, app.screen.width / 1500));
  if (props && props.scale) {
    scale = multiplyScale(scale, props.scale.valueOf() as Scale);
  }

  return (
    <Sprite
      image={getResource('suica.png')}
      anchor={0.5}
      {...props}
      scale={scale}
    />
  );
}
