import * as scripts from 'app/scripts';
import { isTransitionScript, generateTransition } from 'app/scripts';
import { Script } from 'types';

export const getScript = (id: string) => {
  if (isTransitionScript(id)) {
    const names = id.split('\\');
    return generateTransition(names[1], names[2] ?? undefined);
  }

  const sets = Object.values(scripts).filter(
    s => typeof s !== 'string',
  ) as Script[];
  const script = sets.find(s => s.id === id);
  if (!script) {
    throw new Error('Script not found: ' + id);
  }
  return script;
};
