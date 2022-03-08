import React, { FC } from 'react';

import { ParametersProps } from 'components/Node/Parameters/Parameters.models';
import { Parameter } from 'components/Node/Parameters/Parameter/Parameter';

import b_ from 'b_';
import './Parameters.css';
import { Channel } from '../Channel/Channel';
import { TARGET_TYPE } from '../Channel/Channel.models';

const b = b_.with('parameters');

const Parameters: FC<ParametersProps> = ({ parameters }) => (
  <div className={b()}>
    {parameters.map(({ channel, controller, label }) => (
      <Parameter
        key={label}
        controller={controller}
        label={label}
        channel={channel}
      />
    ))}
  </div>
);

export { Parameters };
