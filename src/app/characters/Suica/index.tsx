import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePrevious } from 'react-delta';
import { Sprite, useApp } from '@inlet/react-pixi';

import { CharacterProps } from 'types';
import { getResource, convertScaleToObject } from 'utils';

import {
  executeMovements,
  getPropDiff,
  getPropWatchList,
  setUpSprite,
} from 'app/characters/utils';

export default function Suica(props: CharacterProps = {}) {
  const [sprite, setSprite] = useState<PIXI.Sprite>();
  const prevProps = usePrevious(props);
  const dispatch = useDispatch();

  const app = useApp();
  const INITIAL_SCALE = convertScaleToObject([
    -Math.min(1.25, app.screen.width / 600),
    Math.min(1.25, app.screen.width / 600),
  ]);
  const initialValues: CharacterProps = {
    initialScale: INITIAL_SCALE,
    initialPosition: props.initialPosition,
  };

  useEffect(() => {
    if (!sprite) return;
    const diff = getPropDiff(props, prevProps);
    executeMovements(props.movements ?? [], {
      sprite,
      dispatch,
      pixiApp: app,
      initialValues: setUpSprite(sprite, diff, initialValues, false),
    });
  }, getPropWatchList(props));

  return (
    <Sprite
      ref={instance => {
        if (!instance || sprite) return;
        setSprite(instance);
        executeMovements(props.movements ?? [], {
          sprite: instance,
          dispatch,
          pixiApp: app,
          initialValues: setUpSprite(instance, props, initialValues, true),
        });
      }}
      image={getResource('suica.png')}
    />
  );
}
