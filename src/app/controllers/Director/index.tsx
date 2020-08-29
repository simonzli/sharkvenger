import React, { useState, useEffect } from 'react';
import { useApp } from '@inlet/react-pixi';

import ConversationBox from 'app/components/ConversationBox';
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
};

export default function Director(props: DirectorProps) {
  const { script } = props;
  const [line, setLine] = useState(0);
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
    return script.lines[line][0].character === character
      ? 'active'
      : 'inactive';
  };

  const getCharacter = (character: CharacterEnum) =>
    characters.find(c => c.character === character);

  const getCharacterProps = (line: Line, initialize = false) => {
    const props: CharacterProps = {};
    if (line.character === undefined) return props;
    if (initialize) {
      props.initialPosition = [48, height - 130];
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
    if (line === 0) {
      for (const setting of script.initialSetting) {
        if (getCharacter(setting.character) !== undefined) continue;
        const sprite = getCharacterSprite(setting.character);

        newCharacters.push({
          character: setting.character,
          sprite,
          props: getCharacterProps(setting, true),
        });
      }
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
    characters.map(c => <c.sprite {...c.props} key={c.character} />);

  return (
    <>
      {renderCharacters()}
      <ConversationBox
        name={CharacterName[script.lines[line][0].character ?? -1]}
        text={script.lines[line][0].text}
        onClick={() => setLine(1 - line)}
      />
    </>
  );
}
