import React, { useState } from 'react';
import { Stage } from '@inlet/react-pixi';

import CapsTbpLogos from 'app/components/CapsTbpLogos';
import SharkDetector from 'app/components/SharkDetector';
import ConversationBox from 'app/components/ConversationBox';
import Shark from 'app/characters/Shark';
import Suica from 'app/characters/Suica';

export function HomePage() {
  const [ready, setReady] = useState(false);
  const [pixiApp, setApp] = useState<PIXI.Application>();
  const [opacity, setOpacity] = useState(0);

  const { width, height } = pixiApp?.screen ?? { width: 0, height: 0 };

  const resize = (app = pixiApp) => {
    if (!app) return;
    setReady(false);
    app.resize();
    setReady(true);
  };

  window.onresize = () => resize();

  return (
    <div id="canvas" style={{ opacity }}>
      <Stage
        width={400}
        onMount={app => {
          setApp(app);
          app.resizeTo = document.getElementById('canvas')!;
          setTimeout(() => {
            setOpacity(1);
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

            <Suica position={[width - 90, height - 130]} scale={[2.5, 2.5]} />
            <Shark position={[48, height - 130]} angle={-45} scale={[-3, 3]} />
            <ConversationBox />
          </>
        )}
      </Stage>
    </div>
  );
}
