import React, { useState } from 'react';
import { Stage } from '@inlet/react-pixi';

import CapsTbpLogos from '../../components/CapsTbpLogos';
import SharkDetector from '../../components/SharkDetector';

export function HomePage() {
  const [ready, setReady] = useState(false);
  const [pixiApp, setApp] = useState<PIXI.Application>();

  const resize = (app = pixiApp) => {
    if (!app) return;
    setReady(false);
    const container = document.getElementById('canvas')!;
    const { offsetWidth, offsetHeight } = container;
    const { resolution } = app.renderer;
    app.renderer.resize(offsetWidth / resolution, offsetHeight / resolution);
    app.stage.scale.set(1 / resolution, 1 / resolution);
    setReady(true);
  };

  window.onresize = () => resize();

  return (
    <div id="canvas">
      <Stage
        onMount={app => {
          setApp(app);
          setTimeout(() => resize(app), 0);
        }}
        options={{
          backgroundColor: 0x52b3d9,
        }}
      >
        {ready && (
          <>
            <CapsTbpLogos />
            <SharkDetector />
          </>
        )}
      </Stage>
    </div>
  );
}
