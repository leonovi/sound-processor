import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './NumberInput.css';
import { length } from 'utils/length';

export type NumberInputPropsT = {
  value: number;
  onChange: (value: number) => void;
};

const DEFAULT_INPUT_VALUE = 0;
const SAFETY_AREA = 2;

const calcWidth = (length: number) => `${length + SAFETY_AREA}ch`;

const b = b_.with('number-input');

const NumberInput: FC<NumberInputPropsT> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(
    value ?? DEFAULT_INPUT_VALUE
  );

  useEffect(() => setInternalValue(value ?? DEFAULT_INPUT_VALUE), [value]);
  useEffect(() => onChange(internalValue), [internalValue]);

  return (
    <input
      type="number"
      step={0.1}
      className={b()}
      style={{
        width: calcWidth(length(value.toString())),
      }}
      value={internalValue}
      onChange={(event) => setInternalValue(Number(event.target.value))}
    />
  );
};

export { NumberInput };
