import React, { useState, useCallback } from 'react';
import { useInterval } from 'react-interval-hook';
import { TextStyle } from 'pixi.js';
import { Graphics, Sprite, Text, useApp } from '@inlet/react-pixi';
import gsap from 'gsap';

import { getLocation, getResource } from 'utils';

export default function SharkDetector() {
  const PADDING = 16;
  const HEART_SCALE_FACTOR = 108 / 512;
  const RADAR_RADIUS = 512 * HEART_SCALE_FACTOR;

  const [geo, setGeo] = useState<Position>();
  const [graph, setGraph] = useState<PIXI.Graphics>();
  const [heart, setHeart] = useState<PIXI.Sprite>();

  const app = useApp();
  const heartCenter = {
    x: app.screen.width / 2,
    y: app.screen.height / 2 + 40,
  };

  const { start } = useInterval(
    () => {
      getLoc();
    },
    5000,
    { autoStart: false, immediate: true },
  );

  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(7, 0x2574a9, 0.5);
    g.drawCircle(0, 0, RADAR_RADIUS);
    g.endFill();
    setGraph(g);
    setTimeout(start, 0);
  }, []);

  const getLoc = async () => {
    const loc = await getLocation({ enableHighAccuracy: true });
    setGeo(loc);

    if (!heart || !graph) return;
    const heartScale = Math.max(1 / 1.5, Math.random() + 0.5);

    const motion = {
      ease: 'power2.inOut',
    };

    const config = {
      duration: 1,
      repeat: -1,
      yoyo: true,
      ...motion,
    };

    const heartFrom = {
      x: HEART_SCALE_FACTOR,
      y: HEART_SCALE_FACTOR,
    };

    const graphFrom = {
      x: 1,
      y: 1,
    };

    try {
      await Promise.all([
        gsap.to(heart.scale, { ...heartFrom, ...motion, repeat: 0 }),
        gsap.to(graph.scale, { ...graphFrom, ...motion, repeat: 0 }),
      ]);

      gsap.fromTo(heart.scale, heartFrom, {
        x: 1.5 * heartScale * HEART_SCALE_FACTOR,
        y: 1.5 * heartScale * HEART_SCALE_FACTOR,
        ...config,
      });

      const graphScale = Math.max(1, heartScale * 0.8);
      gsap.fromTo(graph.scale, graphFrom, {
        x: graphScale,
        y: graphScale,
        ...config,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Graphics
        draw={draw}
        anchor={[0.5, 0.5]}
        position={[heartCenter.x, heartCenter.y - 5]}
      />
      <Sprite
        ref={instance => {
          if (instance) setHeart(instance);
        }}
        image={getResource('heart.svg')}
        anchor={[0.5, 0.55]}
        position={heartCenter}
        scale={64 / 512}
      />
      <Text
        text={
          geo
            ? JSON.stringify(
                {
                  latitude: geo.coords.latitude,
                  longitude: geo.coords.longitude,
                  accuracy: `${geo.coords.accuracy} meters`,
                },
                undefined,
                1,
              )
            : ''
        }
        position={[PADDING, 150]}
        style={
          new TextStyle({
            wordWrap: true,
            wordWrapWidth: app.screen.width - 2 * PADDING,
            fontSize: 14,
            align: 'left',
            letterSpacing: 2,
          })
        }
      />
    </>
  );
}
