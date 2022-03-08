import React, { FC } from 'react';

import { Node } from 'components/Node/Node';
import { DESTINATION_INPUT } from 'components/Modules/DestinationModule/DestinationModule.models';

import b_ from 'b_';
import './DestinationModule.css';
import { Module } from 'components/Flow/Flow.models';
import { NodeProps } from 'react-flow-renderer';

const b = b_.with('destination-module');

const DestinationModule: FC<NodeProps<Module>> = () => {
  return (
    <Node
      label="Destination"
      input={DESTINATION_INPUT}
      className={b()}
    />
  );
};

export { DestinationModule };
