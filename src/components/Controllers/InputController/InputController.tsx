import React, { FC } from 'react';

import {
  DEFAULT_STEP,
  InputControllerProps,
} from 'components/Controllers/InputController/InputController.models';

import b_ from 'b_';
import './InputController.css';

const b = b_.with('input-controller');

const InputController: FC<InputControllerProps> = ({
  value,
  minValue,
  maxValue,
  step = DEFAULT_STEP,
  onChange,
}) => (
  <input
    className={b()}
    type="number"
    value={value}
    min={minValue}
    max={maxValue}
    step={step}
    onChange={(event) => onChange(Number(event.target.value))}
  />
);

export { InputController };
