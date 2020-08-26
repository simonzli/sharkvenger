import React, { useState, useEffect } from 'react';
import { Sprite, useApp } from '@inlet/react-pixi';
import gsap from 'gsap';

import { getResource } from 'utils';

export default function Shark() {
  const app = useApp();
  const y = app.screen.height - 100;
  const x = app.screen.width / 2;
  const xDelta = 100;
  const scale = Math.min(0.5, app.screen.width / 1500);

  const [shark, setShark] = useState<PIXI.Sprite>();
  useEffect(() => {
    if (!shark) return;
    gsap.to(shark.position, {
      x: x + xDelta,
      y: y,
      repeat: -1,
      ease: 'power2.inOut',
      duration: 2,
      yoyo: true,
    });
    gsap.to(shark.scale, {
      x: -scale,
      y: scale,
      repeat: -1,
      ease: 'power2.inOut',
      duration: 2,
      yoyo: true,
    });
  }, [scale, shark, x, y]);

  return (
    <Sprite
      image={getResource('shark.png')}
      anchor={[0.5, 1]}
      scale={scale}
      position={[x - xDelta, y]}
      ref={shark => setShark(shark!)}
    />
  );
}
