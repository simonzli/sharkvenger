import { Script } from 'types';
import { Character } from 'app/scripts';

export const getExistingCharacters = (
  script: Script,
  lineId: string,
): Character[] => {
  const lineIndex = script.lines.findIndex(l => l.id === lineId);
  if (lineIndex < 0) return [];

  const characters = new Set<Character>();
  for (let i = lineIndex; i >= 0; i--) {
    const line = script.lines[i];
    if (line.mainCharacter) characters.add(line.mainCharacter);
    for (const setting of line.settings) {
      characters.add(setting.character);
    }
  }

  return Array.from(characters);
};
