import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';

import { useAudioContext } from 'context/AudioContext';
import { InputControllerProps } from 'components/Controllers/InputController/InputController.models';

import { isUndefined } from 'utils/isUndefined';
import { isAudioWorklet } from 'utils/worklet/isAudioWorklet';

import b_ from 'b_';
import './InputController.css';

const b = b_.with('input-controller');

const InputController: FC<InputControllerProps> = ({
  value,
  minValue,
  maxValue,
  defaultValue,
  module,
  controlledParameter,
}) => {
  const { currentTime } = useAudioContext();
  const [internalValue, setInternalValue] = useState(defaultValue);

  useEffect(() => {
    !isUndefined(value) && setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (!isAudioWorklet(module)) {
      return;
    }

    const parameter = module.parameters.get(controlledParameter);

    if (internalValue < minValue) {
      parameter.setValueAtTime(minValue, currentTime);
    } else if (internalValue > maxValue) {
      parameter.setValueAtTime(maxValue, currentTime);
    } else {
      parameter.setValueAtTime(internalValue, currentTime);
    }
  }, [internalValue]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setInternalValue(Number(event.target.value));

  return (
    <input
      className={b()}
      type="number"
      min={minValue}
      max={maxValue}
      value={internalValue}
      onChange={onChange}
    />
  );
};

export { InputController };
