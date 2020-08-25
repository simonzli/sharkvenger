import React from 'react';
import { Sprite, useApp } from '@inlet/react-pixi';

export default function CapsTbpLogos() {
  const app = useApp();
  const height = app.view.height / app.renderer.resolution;
  const width = app.view.width / app.renderer.resolution;
  let scaleFactor = 1;
  if (width <= 375) scaleFactor = 0.85;
  if (width <= 320) scaleFactor = 0.75;
  const offset = 60;

  return (
    <>
      <Sprite image="CAPS.png" position={[16, 16]} scale={scaleFactor * 0.6} />
      <Sprite
        image="TBP.png"
        position={[14, 65 * scaleFactor]}
        scale={scaleFactor * 0.45}
      />
    </>
  );
}
