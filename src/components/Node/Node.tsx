import React, { FC } from 'react';

import { NodeProps } from 'components/Node/Node.models';
import { Channels } from 'components/Node/Channels/Channels';
import { ChannelsMode } from 'components/Node/Channels/Channels.models';
import { Parameters } from 'components/Node/Parameters/Parameters';

import { isUndefined } from 'utils/isUndefined';

import cn from 'classnames';
import b_ from 'b_';
import './Node.css';

const b = b_.with('node');

const Node: FC<NodeProps> = ({
  children,
  className,
  label,
  inputs,
  outputs,
  parameters,
}) => {
  const isInputs = !isUndefined(inputs);
  const isParameter = !isUndefined(parameters);

  return (
    <div className={cn(b(), className)}>
      <span className={b('label')}>{label}</span>

      {(isInputs || isParameter) && (
        <div className={b('left-wrapper')}>
          {isInputs && <Channels mode={ChannelsMode.INPUT} channels={inputs} />}
          {isParameter && <Parameters parameters={parameters} />}
        </div>
      )}

      {children}

      {!isUndefined(outputs) && (
        <Channels mode={ChannelsMode.OUTPUT} channels={outputs} />
      )}
    </div>
  );
};

export { Node };
