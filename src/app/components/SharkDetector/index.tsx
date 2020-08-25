import React from 'react';
import { Graphics } from '@inlet/react-pixi';

export default function SharkDetector() {
  const draw = React.useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(0xffff0b, 0.5);
    g.drawCircle(100, 100, 80);
    g.endFill();
  }, []);

  return <Graphics draw={draw} />;
}
