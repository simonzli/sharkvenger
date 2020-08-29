import React, { useState, useEffect } from 'react';
import { Container, useApp } from '@inlet/react-pixi';

import Background from 'app/components/Background';
import ConversationBox from 'app/components/ConversationBox';
import CapsTbpLogos from 'app/components/CapsTbpLogos';
import MathQuiz from 'app/components/MathQuiz';

import { Line, Script } from 'app/scripts';

import Shark from 'app/characters/Shark';
import Suica from 'app/characters/Suica';

import {
  Character as CharacterEnum,
  CharacterName,
} from 'app/scripts/characters';
import { CharacterProps } from 'types';

interface DirectorProps {
  script: Script;
}

type Character = {
  character: CharacterEnum;
  sprite: (props?: CharacterProps) => JSX.Element;
  props: CharacterProps;
  position: 'left' | 'right' | 'middle';
};

export default function Director(props: DirectorProps) {
  const { script } = props;
  const [line, setLine] = useState(+(localStorage.getItem('line') ?? 0));
  const [initialized, setInitialized] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  const app = useApp();
  const { width, height } = app.screen;

  useEffect(() => {
    updateCharactersList();
  }, [line]);

  const getCharacterSprite = (character: CharacterEnum) => {
    switch (character) {
      case CharacterEnum.MommyShark:
        return Shark;
      case CharacterEnum.Suica:
        return Suica;
      default:
        throw new Error('Unknown character:' + character);
    }
  };

  const getActiveMovement = (character: CharacterEnum) => {
    if (script.lines[line][0].character === character) return 'active';
    const relevantLine = script.lines[line].find(
      l => l.character === character,
    );
    if (relevantLine && relevantLine.movements?.includes('active'))
      return 'active';
    return '!active';
  };

  const goToNextLine = () => {
    const nextLine = script.lines.length === line + 1 ? 0 : line + 1;
    localStorage.setItem('line', '' + nextLine);
    setLine(nextLine);
  };

  const getCharacter = (character: CharacterEnum) =>
    characters.find(c => c.character === character);

  const getCharacterProps = (line: Line, prevProps?: CharacterProps) => {
    const props: CharacterProps = {};
    if (line.character === undefined) return props;
    const HEIGHT = height - 130;
    if (prevProps === undefined) {
      props.initialPosition = [48, HEIGHT];
      props.initialScale = [1, 1];
      if (line.position === 'right') {
        props.initialPosition[0] = width - 90;
        props.initialScale[0] = -1;
      }
    }

    props.movements = [getActiveMovement(line.character)];

    return props;
  };

  const updateCharactersList = () => {
    const newCharacters = [...characters];
    if (!initialized) {
      for (const setting of script.initialSetting) {
        if (getCharacter(setting.character) !== undefined) continue;
        const sprite = getCharacterSprite(setting.character);

        newCharacters.push({
          position: setting.position ?? 'left',
          character: setting.character,
          sprite,
          props: getCharacterProps(setting),
        });
      }
      setInitialized(true);
    }

    const currentLines = script.lines[line];
    for (const character of newCharacters) {
      const relevantLine = currentLines.find(
        l => l.character === character.character,
      );

      character.props = {
        ...character.props,
        movements: [
          ...(relevantLine?.movements ?? []),
          getActiveMovement(character.character),
        ],
      };
    }

    setCharacters(newCharacters);
  };

  const renderCharacters = () =>
    characters
      .sort((a, b) => {
        const isAActive = (a.props.movements ?? []).includes('active');
        if (!isAActive) return -1;
        const isBActive = (b.props.movements ?? []).includes('active');
        if (!isBActive) return 1;

        const isASpeaking = script.lines[line][0].character === a.character;
        return isASpeaking ? 1 : -1;
      })
      .map(c => <c.sprite {...c.props} key={c.character} />);

  const name = CharacterName[script.lines[line][0].character ?? -1];
  const mainCharacter = getCharacter(script.lines[line][0].character ?? -1);

  return (
    <>
      <Background />

      <CapsTbpLogos />

      <Container>{renderCharacters()}</Container>

      <ConversationBox
        name={name}
        namePosition={mainCharacter?.position ?? 'left'}
        text={script.lines[line][0].text}
        onClick={goToNextLine}
      />

      <MathQuiz />
    </>
  );
}
