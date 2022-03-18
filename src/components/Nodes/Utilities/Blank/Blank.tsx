import React, { FC } from 'react';
import { Node } from 'components/Node/Node';

import { LABEL } from './Blank.data';

const Blank: FC = () => (
  <Node label={LABEL}>
    Blank
  </Node>
)

export { Blank };
