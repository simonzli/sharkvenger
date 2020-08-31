import { Movement, MovementProps } from 'types';
import { directorActions } from 'store/slices';

export const executeMovements = async (
  movements: Movement = [],
  props: MovementProps,
  level = 0,
) => {
  if (!Array.isArray(movements)) {
    await movements(props);
  } else {
    if (level % 2 === 0) {
      await Promise.all(
        movements.map(m => executeMovements(m, props, level + 1)),
      );
    } else {
      for (const m of movements) {
        await executeMovements(m, props, level + 1);
      }
    }
  }

  if (level === 0) {
    props.dispatch(directorActions.ready());
  }
};
