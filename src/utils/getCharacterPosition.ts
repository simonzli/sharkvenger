import { Script } from 'types';
import { Character } from 'app/scripts';

export const getCharacterPosition = (
  character: Character,
  script: Script,
  lineId: string,
  distance?: number,
): 'left' | 'right' | 'middle' => {
  const lineIndex = script.lines.findIndex(l => l.id === lineId);
  if (lineIndex < 0) return 'left';

  for (
    let i = lineIndex;
    i >= 0 || (distance !== undefined && lineIndex - i > distance);
    i--
  ) {
    const relevantSetting = script.lines[i].settings.find(
      s => s.character === character,
    );
    if (relevantSetting && relevantSetting.position)
      return relevantSetting.position;
  }

  return 'left';
};
