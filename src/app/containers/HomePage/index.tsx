import React, { useState } from 'react';
import { Stage } from '@inlet/react-pixi';

import CapsTbpLogos from 'app/components/CapsTbpLogos';
import SharkDetector from 'app/components/SharkDetector';
import Shark from 'app/characters/Shark';

export function HomePage() {
  const [ready, setReady] = useState(false);
  const [pixiApp, setApp] = useState<PIXI.Application>();

  const resize = (app = pixiApp) => {
    if (!app) return;
    setReady(false);
    app.resize();
    setReady(true);
  };

  window.onresize = () => resize();

  return (
    <div id="canvas">
      <Stage
        width={400}
        onMount={app => {
          setApp(app);
          app.resizeTo = document.getElementById('canvas')!;
          setTimeout(() => {
            app.resize();
            setReady(true);
          });
        }}
        options={{
          forceCanvas: false,
          antialias: true,
          backgroundColor: 0x52b3d9,
          autoDensity: true,
          autoStart: true,
        }}
      >
        {ready && (
          <>
            <CapsTbpLogos />
            <SharkDetector />
            <Shark />
          </>
        )}
      </Stage>
    </div>
  );
}
