import React, { FC } from 'react';
import { ParameterProps } from 'components/Node/Parameters/Parameter/Parameter.models';

import b_ from 'b_';
import './Parameter.css';

const b = b_.with('parameter');

const Parameter: FC<ParameterProps> = ({ controller, label }) => (
  <div className={b()}>
    {controller}
    <span className={b('label')}>{label}</span>
  </div>
);

export { Parameter };
