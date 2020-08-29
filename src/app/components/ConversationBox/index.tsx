import React, { useState, useEffect } from 'react';
import { TextStyle } from 'pixi.js';
import {
  Container,
  Graphics,
  Text,
  BitmapText,
  useApp,
} from '@inlet/react-pixi';
import gsap from 'gsap';

interface ConversationBoxProps {
  onClick?: (event: PIXI.InteractionEvent) => void;
  name?: string;
  namePosition?: 'left' | 'right' | 'middle';
  text?: string;
}

const nameTextStyle = new TextStyle({
  fill: 0xffffff,
  fontFamily: "'Roboto Mono', monospace",
  dropShadow: true,
  dropShadowColor: 0x0,
  dropShadowAngle: 0,
  dropShadowBlur: 4,
  dropShadowAlpha: 0.8,
  dropShadowDistance: 0,
  fontSize: 16,
  letterSpacing: 1,
});

export default function ConversationBox(props: ConversationBoxProps) {
  const { onClick, name, text, namePosition = 'left' } = props;

  const [clickable, setClickable] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const app = useApp();
  const { width, height } = app.screen;

  useEffect(() => {
    printText();
  }, []);

  useEffect(() => {
    setClickable(false);
    printText();
  }, [text]);

  const printText = (newText = '') => {
    if (!text) return;
    setDisplayText(newText);
    if (newText.length < text.length) {
      setTimeout(() => printText(newText + text.charAt(newText.length)), 15);
    } else {
      setClickable(true);
    }
  };

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

  const renderName = () => {
    if (!name) return;
    switch (namePosition) {
      case 'left':
      case 'middle':
        return <Text text={name} anchor={[0, 0]} x={0} style={nameTextStyle} />;
      case 'right':
        return (
          <Text text={name} anchor={[1, 0]} x={WIDTH} style={nameTextStyle} />
        );
    }
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
      {renderName()}
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
