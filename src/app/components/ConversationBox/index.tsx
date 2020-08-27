import React from 'react';
import { TextStyle } from 'pixi.js';
import { Container, Graphics, Text, useApp } from '@inlet/react-pixi';
import gsap from 'gsap';

interface ConversationBoxProps {
  onClick?: (event: PIXI.InteractionEvent) => void;
  name?: string;
  text?: string;
}

export default function ConversationBox(props: ConversationBoxProps) {
  const { onClick, name, text } = props;

  const app = useApp();
  const { width, height } = app.screen;

  const NAME_HEIGHT = 24;
  const HEIGHT = 120;
  const PADDING = 8;
  const WIDTH = Math.min(400, width - 2 * PADDING);
  const REAL_PADDING = (width - WIDTH) / 2;
  const BOTTOM_OFFSET = 16;

  const drawBox = (g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(2, 0xffffff, 0.8);
    g.beginFill(0x24252a, 0.5);
    g.drawRoundedRect(0, 0, WIDTH, HEIGHT, 8);
    g.endFill();
  };

  const drawTriangle = (g: PIXI.Graphics) => {
    gsap.killTweensOf(g.position);
    g.clear();
    g.lineStyle(2, 0xffffff, 0.8);
    g.beginFill(0xffca02, 1);
    g.moveTo(0, 0);
    g.lineTo(18, 8);
    g.lineTo(0, 16);
    g.lineTo(0, 0);
    g.endFill();

    const x = WIDTH - 30;
    const y = NAME_HEIGHT + HEIGHT - 20 - PADDING;
    g.position.set(x, y);
    gsap.to(g.position, {
      x: x + 2,
      y,
      repeat: -1,
      duration: 0.25,
      yoyo: true,
    });
  };

  return (
    <Container
      position={[REAL_PADDING, height - BOTTOM_OFFSET - HEIGHT - NAME_HEIGHT]}
      click={onClick}
      tap={onClick}
      interactive
    >
      <Graphics draw={drawBox} position={[0, NAME_HEIGHT]} />
      <Graphics draw={drawTriangle} />
      {name && (
        <Text
          text={name}
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
          click={() => console.log(3232)}
        />
      )}
      <Text
        text={text}
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
