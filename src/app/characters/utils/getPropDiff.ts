import { CharacterProps } from 'types';

export const getPropWatchList = (props: CharacterProps) => [
  props.initialPosition,
  props.initialAngle,
  props.initialScale,
  props.movements,
];

export const getPropDiff = (
  props: CharacterProps,
  prevProps?: CharacterProps,
) => {
  if (!prevProps) return;
  const diff: CharacterProps = {};
  if (prevProps.initialPosition !== props.initialPosition)
    diff.initialPosition = props.initialPosition;
  if (prevProps.initialAngle !== props.initialAngle)
    diff.initialAngle = props.initialAngle;
  if (prevProps.initialScale !== props.initialScale)
    diff.initialScale = props.initialScale;

  const movementsSet = new Set<string>();
  (props.movements ?? []).forEach(m => movementsSet.add(m));
  (prevProps.movements ?? []).forEach(m => movementsSet.delete(m));
  diff.movements = Array.from(movementsSet);

  return diff;
};
