import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './NumberInput.css';
import { isNumber } from 'utils/isNumber';
import { toNumber } from 'utils/toNumber';
import { length } from 'utils/length';
import { isEmptyString } from 'utils/isEmptyString';

type InputChangeT = React.ChangeEventHandler<HTMLInputElement>;

type NumberInputPropsT = {
  value: number;
  onChange: (value: number) => void;
}

const DEFAULT_NUMBER = 0;

const SAFETY_AREA = 2;
const calcWidth = (length: number) => `${length + SAFETY_AREA}ch`;

const b = b_.with('number-input');

const NumberInput: FC<NumberInputPropsT> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value])

  useEffect(() => {
    onChange(internalValue);
  }, [internalValue])

  const onInputChange: InputChangeT = ({ target: { value } }) => {
    isEmptyString(value) && setInternalValue(DEFAULT_NUMBER);
    isNumber(value) && setInternalValue(toNumber(value));
  };

  return (
    <input
      className={b()}
      style={{
        width: calcWidth(length(value.toString())),
      }}
      value={internalValue}
      onChange={onInputChange}
    />
  );
};

export { NumberInput };
