import React, { useState, useEffect } from 'react';
import { usePrevious } from 'react-delta';
import { Sprite, useApp } from '@inlet/react-pixi';

import {
  getPropWatchList,
  getPropDiff,
  setUpSprite,
} from 'app/characters/utils';
import { initialScene } from 'app/characters/movements/shark';
import { getResource, convertScaleToObject } from 'utils';
import { CharacterProps } from 'types';

export default function Shark(props: CharacterProps = {}) {
  const [sprite, setSprite] = useState<PIXI.Sprite>();
  const prevProps = usePrevious(props);

  const app = useApp();
  const { width, height } = app.screen;
  const INITIAL_SCALE = convertScaleToObject([
    -Math.min(1.5, width / 500),
    Math.min(1.5, width / 500),
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
    if ((diff?.movements ?? []).includes('initialScene')) {
      initialScene(sprite, INITIAL_SCALE, width, height);
    }
  }, getPropWatchList(props));

  return (
    <Sprite
      ref={instance => {
        if (!instance || sprite) return;
        setSprite(instance);
        setUpSprite(instance, props, initialValues, true);
        if ((props.movements ?? []).includes('initialScene')) {
          initialScene(instance, INITIAL_SCALE, width, height);
        }
      }}
      image={getResource('shark.png')}
    />
  );
}
