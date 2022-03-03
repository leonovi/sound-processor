import React, { FC } from 'react';

import { SelectorControllerProps } from 'components/Controllers/SelectorController/SelectorController.models';
import { SelectorOption } from 'components/Controllers/SelectorController/SelectorOption/SelectorOption';
import { SelectorArrow } from 'components/Controllers/SelectorController/SelectorArrow/SelectorArrow';

import b_ from 'b_';
import './SelectorControllerMenu.css';

const b = b_.with('selector-controller-menu');

const SelectorControllerMenu: FC<SelectorControllerProps> = ({
  options,
}) => (
  <div className={b()}>
    <SelectorArrow />
    {options.map(({ selected, onClick, children }, index) => (
      <SelectorOption key={index} selected={selected} onClick={onClick}>
        {children}
      </SelectorOption>
    ))}
  </div>
);

export { SelectorControllerMenu };
