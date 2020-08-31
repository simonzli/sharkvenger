import React from 'react';
import Input from 'app/components/Input';

export default function MathQuiz() {
  return (
    <Input
      x={16}
      y={120}
      onInput={input => console.log(input)}
      placeholder="Enter your Uniqname"
    />
  );
}
