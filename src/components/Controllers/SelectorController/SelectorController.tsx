import React, { useState } from 'react';

import { SelectorControllerProps } from 'components/Controllers/SelectorController/SelectorController.models';
import { SelectorOption } from './SelectorOption/SelectorOption';

import b_ from 'b_';
import './SelectorController.css';

const b = b_.with('selector-controller');

const SelectorController = <T extends number>({
  options,
  selectedValue,
  onChange,
}: SelectorControllerProps<T>) => (
  <div className={b()}>
    {options.map(({ value, children }) => (
      <SelectorOption
        key={value}
        selected={value === selectedValue}
        onClick={() => onChange(value)}
      >
        {children}
      </SelectorOption>
    ))}
  </div>
);

export { SelectorController };
