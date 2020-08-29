declare module 'pixi-text-input' {
  import React from 'react';
  import { Container, GraphicsGeometry } from 'pixi.js';
  import { _ReactPixi } from '@inlet/react-pixi';

  export type BoxStyleItem = {
    fill?: number;
    rounded?: number;
    stroke?: {
      color?: number;
      width?: number;
      alpha?: number;
    };
  };

  export type BoxStyleGroup = {
    default: BoxStyleItem;
    focused?: BoxStyleItem;
    disabled?: BoxStyleItem;
  };

  export type BoxStyle = BoxStyleItem | BoxStyleGroup;

  export type InputProps = _ReactPixi.IContainer & {
    input?: React.CSSProperties;
    box?: BoxStyle;
    onInput?: (input?: string) => any;
    placeholder?: string;
  };

  class Input extends Container {
    constructor(props: InputProps);
  }

  export default Input;
}
