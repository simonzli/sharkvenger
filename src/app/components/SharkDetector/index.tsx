import React, { useState, useCallback } from 'react';
import { TextStyle } from 'pixi.js';
import { Container, Graphics, Sprite, Text, useApp } from '@inlet/react-pixi';
import gsap from 'gsap';

import { watchLocation, getResource, convertScaleToObject } from 'utils';

export default function SharkDetector() {
  const app = useApp();
  const { width, height } = app.screen;

  const PADDING = 16;
  const HEART_SCALE_FACTOR = 64 / 512;
  const RADAR_RADIUS = 400 * HEART_SCALE_FACTOR;

  const heartCenter = {
    x: RADAR_RADIUS,
    y: RADAR_RADIUS,
  };
  const containerInitialScale = 0.8;
  const containerCenterScale = 1.7;
  const containerInitialPosition = {
    x: width - 2 * RADAR_RADIUS * containerInitialScale - PADDING,
    y: 50,
  };
  const containerCenterPosition = {
    x: width / 2 - RADAR_RADIUS * containerCenterScale,
    y: height / 2 - RADAR_RADIUS * containerCenterScale - 40,
  };

  const [container, setContainer] = useState<PIXI.Container>();
  const [heart, setHeart] = useState<PIXI.Sprite>();
  const [isHeartCenter, setHeartCenter] = useState(false);
  const [centerHeartTl, setCenterHeartTl] = useState<gsap.core.Timeline>();
  const [geo, setGeo] = useState<Position>();

  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(0x52b3d9);
    g.lineStyle(7, 0x3c94c2);
    g.drawCircle(0, 0, RADAR_RADIUS);
    g.endFill();
  }, []);

  const initializeCenterHeartTimeline = useCallback(
    async (container: PIXI.Container) => {
      if (centerHeartTl) return;
      const timeline = gsap.timeline();
      timeline.pause();

      timeline.fromTo(
        container.position,
        containerInitialPosition,
        {
          ...containerCenterPosition,
          ease: 'power2.inOut',
        },
        0,
      );

      timeline.fromTo(
        container.scale,
        convertScaleToObject(containerInitialScale),
        {
          ...convertScaleToObject(containerCenterScale),
          ease: 'power2.inOut',
        },
        0,
      );

      setCenterHeartTl(timeline);
    },
    [centerHeartTl],
  );

  const centerHeart = useCallback(async () => {
    if (!centerHeartTl) return;
    const timeline = centerHeartTl;

    const reversed = isHeartCenter;
    setHeartCenter(!isHeartCenter);

    gsap.to(timeline.pause(), {
      duration: reversed ? timeline.time() : 1,
      time: reversed ? 0 : 1,
    });
  }, [isHeartCenter, centerHeartTl]);

  const updateHeartMotion = useCallback(async () => {
    if (!heart) return;
    const heartScale = Math.max(0.6, Math.random() + 0.5);

    const motion = {
      ease: 'power2.inOut',
    };

    const config = {
      duration: 1,
      repeat: -1,
      yoyo: true,
      ...motion,
    };

    const heartTweens = gsap.getTweensOf(heart.scale);

    try {
      const createTween = () => {
        const tween = gsap.to(heart.scale, {
          x: 1.5 * heartScale * HEART_SCALE_FACTOR,
          y: 1.5 * heartScale * HEART_SCALE_FACTOR,
          ...config,
        });
        tween.eventCallback('onRepeat', () => {
          tween.vars.repeatTime = (tween.vars.repeatTime ?? 0) + 1;
        });
      };

      heartTweens.filter(t => !t.isActive()).forEach(t => t.pause());
      const tweens = heartTweens.filter(t => t.isActive());
      if (tweens.length > 0) {
        tweens.slice(1).forEach(t => t.pause());
        tweens[0].eventCallback('onRepeat', () => {
          tweens[0].vars.repeatTime = (tweens[0].vars.repeatTime ?? 0) + 1;
          if (tweens[0].vars.repeatTime % 2 === 0) {
            tweens[0].pause();
            createTween();
          }
        });
      } else {
        createTween();
      }
    } catch (err) {
      console.error(err);
    }
  }, [heart]);

  return (
    <>
      <Container
        ref={instance => {
          if (!instance || container) return;
          instance.position.set(
            containerInitialPosition.x,
            containerInitialPosition.y,
          );
          instance.scale.set(containerInitialScale, containerInitialScale);
          setContainer(instance);
          initializeCenterHeartTimeline(instance);
        }}
        tap={centerHeart}
        click={centerHeart}
        interactive
      >
        <Graphics
          draw={draw}
          anchor={[0.5, 0.5]}
          position={[heartCenter.x, heartCenter.y - 5]}
        />

        <Sprite
          ref={instance => {
            if (!instance) return;
            instance.scale.set(HEART_SCALE_FACTOR, HEART_SCALE_FACTOR);
            setHeart(instance);
            watchLocation(geo => {
              setGeo(geo);
              updateHeartMotion();
            });
          }}
          angle={15}
          image={getResource('heart.svg')}
          anchor={[0.5, 0.55]}
          position={heartCenter}
        />
      </Container>
      <Text
        text={
          geo
            ? JSON.stringify(
                {
                  latitude: geo.coords.latitude,
                  longitude: geo.coords.longitude,
                  accuracy: `${geo.coords.accuracy} meters`,
                  altitude: geo.coords.altitude,
                  altitudeAccuracy: geo.coords.altitudeAccuracy,
                },
                undefined,
                1,
              )
            : ''
        }
        position={[PADDING, 160]}
        style={
          new TextStyle({
            wordWrap: true,
            wordWrapWidth: app.screen.width - 2 * PADDING,
            fontSize: 14,
            align: 'left',
            letterSpacing: 2,
            fill: 0xffffff,
            dropShadow: true,
            dropShadowColor: 0x0,
            dropShadowAngle: 0,
            dropShadowBlur: 4,
            dropShadowAlpha: 0.8,
            dropShadowDistance: 0,
          })
        }
      />
    </>
  );
}
