import React, { useState, useEffect } from 'react';
import { Container, useApp } from '@inlet/react-pixi';
import { useSelector, useDispatch } from 'react-redux';

import {
  getDirectorState,
  conversationActions,
  directorActions,
} from 'store/slices';

import Background from 'app/components/Background';
import ConversationBox from 'app/components/ConversationBox';
import CapsTbpLogos from 'app/components/CapsTbpLogos';
import MathQuiz from 'app/components/MathQuiz';

import Shark from 'app/characters/Shark';
import Suica from 'app/characters/Suica';

import { active, inactive, stopAll } from 'app/characters/movements';

import { getScript, getCharacterPosition, getExistingCharacters } from 'utils';

import {
  Character as CharacterEnum,
  CharacterName,
} from 'app/scripts/characters';
import { getTransitionScriptId, TRANSITION_ID } from 'app/scripts';
import { CharacterProps, Line, Script } from 'types';

type Character = {
  character: CharacterEnum;
  sprite: (props?: CharacterProps) => JSX.Element;
  props: CharacterProps;
  position: 'left' | 'right' | 'middle';
};

export default function Director() {
  const state = useSelector(getDirectorState);
  const dispatch = useDispatch();

  const [initialized, setInitialized] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLineFinished, setLineFinished] = useState(false);

  const { script: scriptId, line: lineId } = state;
  const script = getScript(scriptId);
  const line = script.lines.find(l => l.id === lineId) ?? script.lines[0];

  const app = useApp();
  const { width, height } = app.screen;

  useEffect(() => {
    goToNextLine(script, line);
  }, []);

  useEffect(() => {
    updateCharactersList();
  }, [line]);

  useEffect(() => {
    if (state.readyCount === line.settings.length) {
      setLineFinished(true);
      if (line.autoNext) {
        goToNextLine();
      }
    }
  }, [state.readyCount]);

  useEffect(() => {
    const name = CharacterName[line.mainCharacter ?? -1];
    const mainCharacter = getCharacter(line.mainCharacter ?? -1);
    const namePosition = mainCharacter?.position ?? 'left';
    const { text = '' } = line;

    dispatch(
      conversationActions.updateConversation({
        name,
        namePosition,
        text,
        showConversationBox: line.text !== undefined,
      }),
    );
  }, [line]);

  const getCharacterSprite = (character: CharacterEnum) => {
    switch (character) {
      case CharacterEnum.MommyShark:
        return Shark;
      case CharacterEnum.Suica:
        return Suica;
      default:
        throw new Error('Unknown character: ' + character);
    }
  };

  const getActiveMovement = (character: CharacterEnum) => {
    if (line.mainCharacter === character) return active;
    const relevantSetting = line.settings.find(s => s.character === character);
    if (relevantSetting && relevantSetting.movements?.includes(active))
      return active;
    return inactive;
  };

  const goToNextLine = (nextScript?: Script, nextLine?: Line) => {
    let ns: Script;
    let nl: Line;
    if (nextScript) {
      ns = nextScript;
      nl = nextLine ?? nextScript.lines[0];
    } else {
      const lineIndex = script.lines.findIndex(l => l.id === lineId);
      if (lineIndex === script.lines.length - 1) {
        if (script.jumpTo) {
          ns = getScript(script.jumpTo.script);
          nl = script.jumpTo.lineId
            ? ns.lines.find(l => l.id === script.jumpTo!.lineId) ?? ns.lines[0]
            : ns.lines[0];
        } else {
          return;
        }
      } else {
        ns = script;
        nl = script.lines[lineIndex + 1];
      }
    }

    if (script.id !== ns.id && !script.id.startsWith(TRANSITION_ID)) {
      setCharacters([]);
      setInitialized(false);

      dispatch(
        directorActions.updateDirector({
          ...state,
          script: getTransitionScriptId(ns.id, nl.id),
          line: '0',
          readyCount: 0,
        }),
      );
    } else {
      dispatch(
        directorActions.updateDirector({
          ...state,
          script: ns.id,
          line: nl.id,
          readyCount: 0,
        }),
      );
    }
  };

  const getCharacter = (character: CharacterEnum) =>
    characters.find(c => c.character === character);

  const getCharacterProps = (
    line: Line,
    character: CharacterEnum,
    prevProps?: CharacterProps,
  ) => {
    const props: CharacterProps = {};

    const HEIGHT = height - 130;
    if (prevProps === undefined) {
      props.initialPosition = [48, HEIGHT];
      props.initialScale = [1, 1];
      if (getCharacterPosition(character, script, line.id) === 'right') {
        props.initialPosition[0] = width - 90;
        props.initialScale[0] = -1;
      }
    }

    return props;
  };

  const createCharacter = (character: CharacterEnum): Character => {
    const sprite = getCharacterSprite(character);

    return {
      position: getCharacterPosition(character, script, line.id),
      character: character,
      sprite,
      props: getCharacterProps(line, character),
    };
  };

  const updateCharactersList = () => {
    const newCharacters = [...characters];

    if (script.id.startsWith(TRANSITION_ID)) {
      for (const character of newCharacters) {
        character.props = {
          ...character.props,
          movements: [stopAll],
        };
      }

      setCharacters(newCharacters);
      return;
    }

    if (!initialized) {
      const existingCharacters = getExistingCharacters(script, line.id);
      for (const character of existingCharacters) {
        if (getCharacter(character) !== undefined) continue;
        newCharacters.push(createCharacter(character));
      }
      setInitialized(true);
    }

    for (const setting of line.settings) {
      if (!newCharacters.find(c => c.character === setting.character)) {
        newCharacters.push(createCharacter(setting.character));
      }
    }

    for (const character of newCharacters) {
      const relevantSetting = line.settings.find(
        s => s.character === character.character,
      );

      const movements = relevantSetting?.movements ?? [];
      if (!line.noActiveDetection) {
        movements.push(getActiveMovement(character.character));
      }

      character.props = {
        ...character.props,
        movements,
      };
    }

    setCharacters(newCharacters);
  };

  const renderCharacters = () =>
    characters
      .sort((a, b) => {
        const isAActive = (a.props.movements ?? []).includes(active);
        if (!isAActive) return -1;
        const isBActive = (b.props.movements ?? []).includes(active);
        if (!isBActive) return 1;

        const isASpeaking = line.mainCharacter === a.character;
        return isASpeaking ? 1 : -1;
      })
      .map(c => <c.sprite {...c.props} key={c.character} />);

  return (
    <>
      <Background />

      <CapsTbpLogos />

      <Container>{renderCharacters()}</Container>

      <ConversationBox
        onClick={isLineFinished ? () => goToNextLine() : undefined}
      />

      <MathQuiz />
    </>
  );
}
