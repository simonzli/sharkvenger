import React from 'react';
import { TextStyle } from 'pixi.js';
import { Container, Graphics, Text, useApp } from '@inlet/react-pixi';

export default function ConversationBox() {
  const app = useApp();
  const { width, height } = app.screen;

  const NAME_HEIGHT = 24;
  const HEIGHT = 120;
  const PADDING = 8;
  const WIDTH = Math.min(400, width - 2 * PADDING);
  const REAL_PADDING = (width - WIDTH) / 2;
  const BOTTOM_OFFSET = 16;

  const drawBox = (g: PIXI.Graphics) => {
    g.lineStyle(2, 0xffffff, 0.8);
    g.beginFill(0x24252a, 0.5);
    g.drawRoundedRect(0, 0, WIDTH, HEIGHT, 8);
    g.endFill();
  };

  return (
    <Container
      position={[REAL_PADDING, height - BOTTOM_OFFSET - HEIGHT - NAME_HEIGHT]}
    >
      <Graphics draw={drawBox} position={[0, NAME_HEIGHT]} />
      <Text
        text={'Mommy Shark'}
        style={
          new TextStyle({
            fill: 0xffffff,
            fontFamily: "'Roboto Mono', monospace",
            dropShadow: true,
            dropShadowColor: 0x333,
            dropShadowAngle: 0,
            dropShadowBlur: 4,
            dropShadowAlpha: 0.5,
            dropShadowDistance: 4,
            fontSize: 16,
            letterSpacing: 1,
          })
        }
      />
      <Text
        text={
          'Somebody stole my kid while I was doing home schooling. Would you help me find him?'
        }
        position={[PADDING, PADDING + NAME_HEIGHT]}
        style={
          new TextStyle({
            fill: 0xffffff,
            fontSize: 16,
            fontFamily: "'Lato', sans-serif",
            wordWrap: true,
            wordWrapWidth: WIDTH - 2 * PADDING,
            dropShadowColor: 0x333,
            dropShadowAngle: 0,
            dropShadowBlur: 2,
            dropShadowAlpha: 0.5,
            dropShadowDistance: 2,
            letterSpacing: 0.5,
          })
        }
      />
    </Container>
  );
}
