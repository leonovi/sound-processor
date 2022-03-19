import React, { FC } from 'react';
import { NodeComponentProps } from 'react-flow-renderer';
import { Node } from 'components/Node/Node';

import { SumDataT } from './Sum.models';
import { SUM_SYMBOL } from './Sum.data';

const Sum: FC<NodeComponentProps<SumDataT>> = () => {
  return (
    <Node>
      {SUM_SYMBOL}
    </Node>
  )
}

export { Sum };
