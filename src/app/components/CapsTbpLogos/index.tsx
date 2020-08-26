import React from 'react';
import { Container, Sprite, useApp } from '@inlet/react-pixi';

import { getResource } from 'utils';

export default function CapsTbpLogos() {
  const app = useApp();
  const width = app.view.width / app.renderer.resolution;
  let scaleFactor = 1;
  if (width <= 375) scaleFactor = 0.85;
  if (width <= 320) scaleFactor = 0.75;

  return (
    <Container position={[14, 16]} scale={scaleFactor}>
      <Sprite image={getResource('CAPS.png')} position={[2, 0]} scale={0.6} />
      <Sprite image={getResource('TBP.png')} position={[0, 44]} scale={0.45} />
    </Container>
  );
}
