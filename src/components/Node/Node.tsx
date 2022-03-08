import React, { FC } from 'react';

import { NodeProps } from 'components/Node/Node.models';
import { Parameters } from 'components/Node/Parameters/Parameters';
import { Channel } from './Channel/Channel';
import { SOURCE_TYPE, TARGET_TYPE } from './Channel/Channel.models';

import cn from 'classnames';
import b_ from 'b_';
import './Node.css';
import { isUndefined } from 'utils/isUndefined';

const b = b_.with('node');

const Node: FC<NodeProps> = ({
  children,
  className,
  label,
  input,
  output,
  parameters,
}) => {
  const isInput = !isUndefined(input);
  const isOutput = !isUndefined(output);
  const isParameters = !isUndefined(parameters);
  return (
    <div className={cn(b(), className)}>
      <span className={b('label')}>{label}</span>

      <div className={b('inputs')}>
        {isInput && <Channel id={input.id} label="Input" type={TARGET_TYPE} />}
        {isParameters && <Parameters parameters={parameters} />}
      </div>

      {children}

      <div className={b('outputs')}>
        {isOutput && (
          <Channel id={output.id} label="Output" type={SOURCE_TYPE} />
        )}
      </div>
    </div>
  );
};

export { Node };
