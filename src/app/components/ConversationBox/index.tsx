import React, { useState, useEffect } from 'react';
import { TextStyle } from 'pixi.js';
import {
  Container,
  Graphics,
  Text,
  BitmapText,
  useApp,
  useTick,
} from '@inlet/react-pixi';
import gsap from 'gsap';

interface ConversationBoxProps {
  onClick?: (event: PIXI.InteractionEvent) => void;
  name?: string;
  text?: string;
}

export default function ConversationBox(props: ConversationBoxProps) {
  const { onClick, name, text } = props;

  const [clickable, setClickable] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const app = useApp();
  const { width, height } = app.screen;

  useEffect(() => {
    setDisplayText('');
    setClickable(false);
  }, [text]);

  useTick(delta => {
    if (text && displayText.length < text.length) {
      if (displayText.length === text.length - 1) {
        setClickable(true);
      }
      let newText = displayText + text.charAt(displayText.length);
      if (newText.length !== text.length && Math.random() > 0.5) {
        newText += text.charAt(text.length);
      }
      setDisplayText(newText);
    }
  });

  const NAME_HEIGHT = 24;
  const HEIGHT = 120;
  const PADDING = 8;
  const WIDTH = Math.min(400, width - 2 * PADDING);
  const REAL_PADDING = (width - WIDTH) / 2;
  const BOTTOM_OFFSET = 16;

  const drawBox = (g: PIXI.Graphics) => {
    if (g.getBounds().width !== 0) return;
    g.lineStyle(2, 0xffffff, 0.8);
    g.beginFill(0x24252a, 0.5);
    g.drawRoundedRect(0, 0, WIDTH, HEIGHT, 8);
    g.endFill();
  };

  const drawTriangle = (g: PIXI.Graphics) => {
    if (g.getBounds().width !== 0) return;
    g.lineStyle(2, 0xffffff, 0.8);
    g.beginFill(0xffca02, 1);
    g.moveTo(0, 0);
    g.lineTo(18, 8);
    g.lineTo(0, 16);
    g.lineTo(0, 0);
    g.closePath();
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

  const handleClick = (e: PIXI.InteractionEvent) => {
    if (clickable && onClick) onClick(e);
  };

  return (
    <Container
      position={[REAL_PADDING, height - BOTTOM_OFFSET - HEIGHT - NAME_HEIGHT]}
      click={handleClick}
      tap={handleClick}
      interactive
    >
      <Graphics draw={drawBox} position={[0, NAME_HEIGHT]} />
      {clickable && <Graphics draw={drawTriangle} />}
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
      <BitmapText
        text={displayText}
        position={[PADDING, PADDING + NAME_HEIGHT]}
        letterSpacing={0.5}
        style={{
          fontName: 'Lato',
          fontSize: 16,
          maxWidth: WIDTH - 2 * PADDING,
        }}
      />
    </Container>
  );
}
