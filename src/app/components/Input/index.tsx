import React from 'react';
import TextInput, {
  InputProps,
  BoxStyleItem,
  BoxStyleGroup,
  BoxStyle,
} from 'pixi-text-input';
import { PixiComponent } from '@inlet/react-pixi';

import { convertScaleToObject } from 'utils';

const defaultInputStyle: React.CSSProperties = {
  padding: '8px',
  fontSize: '16px',
  color: '#26272E',
};

const defaultSingleBoxStyle: BoxStyleItem = {
  fill: 0xe8e9f3,
  rounded: 8,
  stroke: { color: 0xcbcee0, width: 4 },
};

const defaultBoxStyle: BoxStyleGroup = {
  default: defaultSingleBoxStyle,
  focused: {
    fill: 0xe1e3ee,
    rounded: 8,
    stroke: { color: 0xabafc6, width: 4 },
  },
  disabled: { fill: 0xdbdbdb, rounded: 16 },
};

const applyProps = (instance: TextInput, _: InputProps, props: InputProps) => {
  if (props.position) {
    const position = convertScaleToObject(props.position);
    instance.position.set(position.x, position.y);
  }

  if (props.x !== undefined && props.y !== undefined) {
    instance.position.set(props.x, props.y);
  }

  if (props.onInput) {
    instance.removeListener('input');
    instance.on('input', props.onInput);
  }

  (instance as any).placeholder = props.placeholder ?? '';
};

const Input = PixiComponent<InputProps, TextInput>('Input', {
  create: props => {
    const inputStyle = { ...defaultInputStyle, ...props.input };
    const groupBoxStyle = props.box as BoxStyleGroup;
    const singleBoxStyle = props.box as BoxStyleItem;
    let boxStyle: BoxStyle = defaultBoxStyle;
    if (props.box) {
      boxStyle = Object.keys(props.box).includes('default')
        ? {
            default: { ...defaultSingleBoxStyle, ...groupBoxStyle.default },
            focused: { ...defaultBoxStyle.focused, ...groupBoxStyle.focused },
            disabled: {
              ...defaultBoxStyle.disabled,
              ...groupBoxStyle.disabled,
            },
          }
        : { ...defaultSingleBoxStyle, ...singleBoxStyle };
    }
    const instance = new TextInput({
      input: inputStyle,
      box: boxStyle,
    });
    applyProps(instance, {}, props);
    setTimeout(() => (instance as any).focus());
    return instance;
  },
  applyProps,
});

export default Input;
