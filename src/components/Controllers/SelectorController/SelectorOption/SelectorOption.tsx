import React, { FC } from 'react';

import b_ from 'b_';
import './SelectorOption.css';

const b = b_.with('selector-option');

const SelectorOption: FC<{ selected: boolean; onClick: () => void }> = ({
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
