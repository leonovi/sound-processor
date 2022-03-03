import React, { FC } from 'react';

import { ParametersProps } from 'components/Node/Parameters/Parameters.models';
import { Parameter } from 'components/Node/Parameters/Parameter/Parameter';

import b_ from 'b_';
import './Parameters.css';

const b = b_.with('parameters');

const Parameters: FC<ParametersProps> = ({ parameters }) => (
  <div className={b()}>
    {parameters.map(({ controller, label }) => (
      <Parameter controller={controller} label={label} />
    ))}
  </div>
);

export { Parameters };
