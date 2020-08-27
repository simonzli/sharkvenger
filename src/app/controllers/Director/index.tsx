import React, { useState } from 'react';
import { useApp } from '@inlet/react-pixi';

import ConversationBox from 'app/components/ConversationBox';
import { Script } from 'app/scripts';

import Shark from 'app/characters/Shark';
import Suica from 'app/characters/Suica';

import { CharacterName } from 'app/scripts/characters';

interface DirectorProps {
  script: Script;
}

type ExpressionState = { [index: string]: string };

export default function Director(props: DirectorProps) {
  const { script } = props;
  const [line, setLine] = useState(0);
  const [expressions, setExpressions] = useState<ExpressionState>({});

  const app = useApp();
  const { width, height } = app.screen;

  return (
    <>
      <Suica position={[width - 90, height - 130]} scale={[2.5, 2.5]} />
      <Shark position={[48, height - 130]} angle={-45} scale={[-3, 3]} />

      <ConversationBox
        name={CharacterName[script.lines[line].character ?? -1]}
        text={script.lines[line].text}
        onClick={() => setLine(1 - line)}
      />
    </>
  );
}
