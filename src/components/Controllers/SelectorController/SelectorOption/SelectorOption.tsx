import React, { FC } from 'react';
import { SelectorControllerOption } from 'components/Controllers/SelectorController/SelectorController.models';

import b_ from 'b_';
import './SelectorOption.css';

const b = b_.with('selector-option');

const SelectorOption: FC<SelectorControllerOption> = ({
  selected,
  onClick,
  children,
}) => {
  return (
    <button className={b({ selected })} onClick={onClick}>
      {children}
    </button>
  );
};

export { SelectorOption };
