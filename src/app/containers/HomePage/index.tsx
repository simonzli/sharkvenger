import React, { useState, useEffect } from 'react';
import { TextStyle, Loader } from 'pixi.js';
import { Stage } from '@inlet/react-pixi';

import CapsTbpLogos from 'app/components/CapsTbpLogos';
import SharkDetector from 'app/components/SharkDetector';

import { intro } from 'app/scripts';
import Director from 'app/controllers/Director';

import { getResource } from 'utils';

export function HomePage() {
  const [ready, setReady] = useState(false);
  const [resourceReady, setResourceReady] = useState(false);
  const [pixiApp, setApp] = useState<PIXI.Application>();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => loadFont(), []);

  const loadFont = () => {
    new Loader()
      .add(
        'Lato',
        getResource('/Lato.fnt'),
        new TextStyle({
          dropShadowColor: 0x333,
          dropShadowAngle: 0,
          dropShadowBlur: 2,
          dropShadowAlpha: 0.5,
          dropShadowDistance: 2,
          letterSpacing: 0.5,
        }),
      )
      .load(() => {
        setResourceReady(true);
      });
  };

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
            app.resize();
            setReady(true);
            setOpacity(1);
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
        {ready && resourceReady && (
          <>
            <CapsTbpLogos />
            <SharkDetector />

            <Director script={intro} />
          </>
        )}
      </Stage>
    </div>
  );
}
