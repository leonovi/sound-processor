import React, { FC } from 'react';

import b_ from 'b_';
import './SelectorArrow.css';

const b = b_.with('selector-arrow');

const SelectorArrow: FC<{ reverse?: boolean }> = ({ reverse = false }) => (
  <svg
    className={b({ reverse })}
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 6.62621C1 6.91234 1.36443 7.08946 1.60985 6.95321L6.79362 4.38491C7.06879 4.23503 7.06879 3.75816 6.79362 3.60828L1.60985 1.04679C1.36443 0.910541 1 1.08767 1 1.37379V6.62621Z" />
  </svg>
);

export { SelectorArrow };
