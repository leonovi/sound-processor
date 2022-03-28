import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './NumberInput.css';
import { isNumber } from 'utils/isNumber';
import { toNumber } from 'utils/toNumber';
import { length } from 'utils/length';
import { isEmptyString } from 'utils/isEmptyString';
import { NumberInputPropsT } from './NumberInput.models';

const DEFAULT_NUMBER = 0;

const SAFETY_AREA = 2;
const calcWidth = (length: number) => `${length + SAFETY_AREA}ch`;

const b = b_.with('number-input');

const NumberInput: FC<NumberInputPropsT> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => setInternalValue(value), [value]);
  useEffect(() => onChange(internalValue), [internalValue]);

  return (
    <input
      className={b()}
      style={{
        width: calcWidth(length(value.toString())),
      }}
      value={internalValue}
      onChange={(event) => {
        isEmptyString(event.target.value) && setInternalValue(DEFAULT_NUMBER);
        isNumber(event.target.value) &&
          setInternalValue(toNumber(event.target.value));
      }}
    />
  );
};

export { NumberInput };
