import React, { useState, useEffect } from 'react';
import { Loader } from 'pixi.js';
import { Sprite, useApp, useTick } from '@inlet/react-pixi';

import { getResource } from 'utils';

const loader = new Loader();

export default function Background() {
  const ORIGINAL_WIDTH = 600;
  const ORIGINAL_HEIGHT = 800;
  const IMAGE_URL = getResource('BBB.jpg');

  const [resourceLoadedAt, setLoadedAt] = useState(-1);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    updateOpacity();
  }, []);

  useTick(delta => {
    if (resourceLoadedAt < 0) return;
    setOpacity((Date.now() - resourceLoadedAt) / 300);
  });

  const updateOpacity = () => {
    try {
      loader.add(IMAGE_URL).load(() => setLoadedAt(Date.now()));
    } catch (err) {
      setLoadedAt(Date.now());
    }
  };

  const app = useApp();
  const { width, height } = app.screen;
  const scale =
    width / height > ORIGINAL_WIDTH / ORIGINAL_HEIGHT
      ? width / ORIGINAL_WIDTH
      : height / ORIGINAL_HEIGHT;
  const position = { x: width / 2, y: height / 2 };

  return (
    <Sprite
      image={IMAGE_URL}
      anchor={0.5}
      position={position}
      scale={scale}
      alpha={opacity}
    />
  );
}
