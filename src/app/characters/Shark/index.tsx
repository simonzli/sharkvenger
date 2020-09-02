import React, { useState, useEffect } from 'react';
import { usePrevious } from 'react-delta';
import { useDispatch } from 'react-redux';
import { Sprite, useApp } from '@inlet/react-pixi';

import {
  getPropWatchList,
  getPropDiff,
  setUpSprite,
  executeMovements,
} from 'app/characters/utils';
import { getResource, convertScaleToObject } from 'utils';
import { CharacterProps } from 'types';
import { Character } from 'app/scripts';

export default function Shark(props: CharacterProps = {}) {
  const dispatch = useDispatch();
  const [sprite, setSprite] = useState<PIXI.Sprite>();
  const prevProps = usePrevious(props);

  const app = useApp();
  const { width } = app.screen;
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

  const movementProps = {
    dispatch,
    pixiApp: app,
    character: Character.MommyShark,
  };

  useEffect(() => {
    if (!sprite) return;
    const diff = getPropDiff(props, prevProps);
    executeMovements(props.movements ?? [], {
      ...movementProps,
      sprite,
      initialValues: setUpSprite(sprite, diff, initialValues, false),
    });
  }, getPropWatchList(props));

  return (
    <Sprite
      ref={instance => {
        if (!instance || sprite) return;
        setSprite(instance);
        executeMovements(props.movements ?? [], {
          ...movementProps,
          sprite: instance,
          initialValues: setUpSprite(instance, props, initialValues, true),
        });
      }}
      image={getResource('shark.png')}
    />
  );
}
