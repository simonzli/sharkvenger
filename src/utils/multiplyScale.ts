export type ArrayScale = [number, number];
export type ObjectScale = { x: number; y: number };
export type Scale = number | ObjectScale | ArrayScale;
export type PointLike = Scale;

export const convertScaleToArray = (scale: Scale): ArrayScale => {
  if (typeof scale === 'number') {
    return [scale, scale];
  } else if (Array.isArray(scale)) {
    return scale;
  } else {
    return [scale.x, scale.y];
  }
};

export const convertScaleToObject = (scale: Scale): ObjectScale => {
  if (typeof scale === 'number') {
    return { x: scale, y: scale };
  } else if (Array.isArray(scale)) {
    return { x: scale[0], y: scale[1] };
  } else {
    return scale;
  }
};

export const multiplyScale = (scaleA: Scale, scaleB: Scale): ArrayScale => {
  const sA = convertScaleToArray(scaleA);
  const sB = convertScaleToArray(scaleB);
  return [sA[0] * sB[0], sA[1] * sB[1]];
};
