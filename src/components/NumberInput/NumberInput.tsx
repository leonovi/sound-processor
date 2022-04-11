import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './NumberInput.css';
import { isNumber } from 'utils/isNumber';
import { length } from 'utils/length';
import { isEmptyString } from 'utils/isEmptyString';
import { matchRegexp } from 'utils/matchRegexp';

export type NumberInputPropsT = {
  value: number;
  onChange: (value: number) => void;
}

const DEFAULT_INPUT_VALUE = 0;

const SAFETY_AREA = 2;
const calcWidth = (length: number) => `${length + SAFETY_AREA}ch`;
const DEFAULT_WIDTH = calcWidth(length(DEFAULT_INPUT_VALUE.toString()));

const NUM_REGEXP = /^\d+$/;

const b = b_.with('number-input');

const NumberInput: FC<NumberInputPropsT> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value ?? DEFAULT_INPUT_VALUE);

  const shouldSetInputValue = isNumber(value) || matchRegexp(value, NUM_REGEXP);
  useEffect(
    () => setInternalValue(shouldSetInputValue ? value : DEFAULT_INPUT_VALUE),
    [value]
  );
  useEffect(() => onChange(internalValue), [internalValue]);

  return (
    <input
      className={b()}
      style={{
        width: shouldSetInputValue
          ? calcWidth(length(value.toString()))
          : DEFAULT_WIDTH,
      }}
      value={internalValue}
      onChange={(event) => {
        const { value } = event.target;

        if (isEmptyString(value)) {
          setInternalValue(DEFAULT_INPUT_VALUE);
        }

        if (shouldSetInputValue) {
          setInternalValue(Number(value));
        }
      }}
    />
  );
};

export { NumberInput };
