import React from 'react';
import { Sprite, useApp } from '@inlet/react-pixi';

export default function CapsTbpLogos() {
  const app = useApp();
  const height = app.view.height;
  const scaleFactor = app.view.width < 350 ? 0.85 : 1;

  return (
    <>
      <Sprite
        image="/CAPS.png"
        anchor={[0, 1]}
        position={[16, height - 16]}
        scale={0.3 * scaleFactor}
      />
      <Sprite
        image="/TBP.png"
        anchor={[0, 1]}
        position={[16, height - 60 * scaleFactor]}
        scale={0.4 * scaleFactor}
      />
    </>
  );
}
