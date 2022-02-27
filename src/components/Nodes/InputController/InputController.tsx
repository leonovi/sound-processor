import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { isUndefined } from 'utils/isUndefined';

import b_ from 'b_';
import './InputController.css';
import { isAudioWorklet } from 'utils/isAudioWorklet';
import { useAudioContext } from 'context/AudioContext';

const b = b_.with('input-controller');

type InputControllerProps = {
  value?: number;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  module: AudioNode | null;
  controlledParameter: string;
};

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
      parameter.setValueAtTime(minValue, currentTime + 1);
    } else if (internalValue > maxValue) {
      parameter.setValueAtTime(maxValue, currentTime + 1);
    } else {
      parameter.setValueAtTime(internalValue, currentTime + 1);
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
