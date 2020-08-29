import React, { useState, useEffect } from 'react';
import { usePrevious } from 'react-delta';
import { Sprite, useApp } from '@inlet/react-pixi';

import {
  getPropWatchList,
  getPropDiff,
  setUpSprite,
} from 'app/characters/utils';
import { getResource, convertScaleToObject } from 'utils';
import { CharacterProps } from 'types';

export default function Shark(props: CharacterProps = {}) {
  const [sprite, setSprite] = useState<PIXI.Sprite>();
  const prevProps = usePrevious(props);

  const app = useApp();
  const INITIAL_SCALE = convertScaleToObject([
    -Math.min(1.5, app.screen.width / 500),
    Math.min(1.5, app.screen.width / 500),
  ]);
  const INITIAL_ANGLE = -45;

  const initialValues: CharacterProps = {
    initialScale: INITIAL_SCALE,
    initialAngle: INITIAL_ANGLE,
    initialPosition: props.initialPosition,
  };

  useEffect(() => {
    if (!sprite) return;
    const diff = getPropDiff(props, prevProps);
    setUpSprite(sprite, diff, initialValues, false);
  }, getPropWatchList(props));

  return (
    <Sprite
      ref={instance => {
        if (!instance || sprite) return;
        setSprite(instance);
        setUpSprite(instance, props, initialValues, true);
      }}
      image={getResource('shark.png')}
    />
  );
}
