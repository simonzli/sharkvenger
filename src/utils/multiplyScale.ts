import { Scale, ObjectScale, ArrayScale } from 'types';

export const convertScaleToArray = (scale: Scale): ArrayScale => {
  if (typeof scale === 'number') {
    return [scale, scale];
  } else if (Array.isArray(scale) && scale.length === 1) {
    return [scale[0], scale[0]];
  } else if (Array.isArray(scale) && scale.length === 2) {
    return scale;
  } else {
    return [scale.x, scale.y];
  }
};

export const convertScaleToObject = (scale: Scale): ObjectScale => {
  if (typeof scale === 'number') {
    return { x: scale, y: scale };
  } else if (Array.isArray(scale) && scale.length === 1) {
    return { x: scale[0], y: scale[0] };
  } else if (Array.isArray(scale) && scale.length === 2) {
    return { x: scale[0], y: scale[1] };
  } else {
    return scale;
  }
};

export const multiplyScale = (scaleA: Scale, scaleB: Scale): ObjectScale => {
  const sA = convertScaleToArray(scaleA);
  const sB = convertScaleToArray(scaleB);
  return {
    x: sA[0] * sB[0],
    y: sA[1] * sB[1],
  };
};
