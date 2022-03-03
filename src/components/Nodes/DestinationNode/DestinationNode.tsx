import React, { FC } from 'react';

import { Node } from 'components/Node/Node';
import { DESTINATION_INPUTS } from 'components/Nodes/DestinationNode/DestinationNode.models';

import b_ from 'b_';
import './DestinationNode.css';

const b = b_.with('destination-node');

const DestinationNode: FC = () => {
  return (
    <Node
      label="Destination"
      inputs={DESTINATION_INPUTS}
      className={b()}
    />
  );
};

export { DestinationNode };
