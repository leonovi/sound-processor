import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import b_ from 'b_';
import './Operation.css';
import { Node } from 'components/Node/Node';

import { useInternalUpdate } from 'hooks/useUpdate';
import { useConnection } from 'hooks/useConnection';
import { useInputsValues } from 'hooks/useInputsValues';

import { createNodeClass } from 'utils/createNodeClass';
import {
  divide,
  multiply,
  subtract,
  sum,
} from 'utils/math';
import { ZERO } from 'utils/constants';

import { NodeTypes } from 'components/Nodes/models';
import {
  DivideNodeT,
  MultiplyNodeT,
  OperationNodeT,
  SubtractNodeT,
  SumNodeT,
} from './Operation.models';
import { NodeValueT } from 'components/Flow/Flow.models';
import { flattenProps } from 'utils/flattenProps';
import { useUpdateNodeInternals } from 'react-flow-renderer';
import { useConnections } from 'store/connections';
import { isNull } from 'utils/isNull';
import { isNumber } from 'tone';

const MathSymbols = {
  [NodeTypes.Sum]: '+',
  [NodeTypes.Subtract]: '-',
  [NodeTypes.Multiply]: '*',
  [NodeTypes.Divide]: '/',
};

const OperationFunc = {
  [NodeTypes.Sum]: sum,
  [NodeTypes.Subtract]: subtract,
  [NodeTypes.Multiply]: multiply,
  [NodeTypes.Divide]: divide,
};

const b = b_.with('operation-node');

const Operation: FC<OperationNodeT> = ({
  className,
  ...props
}) => {
  const {
    id,
    type,
    data,
    methods,
    config,
    inputs: { bang, first, second },
  } = flattenProps<OperationNodeT>(props);

  const { getSourceValue } = useConnections();

  const update = useUpdateNodeInternals();
  const updateNode = () => {
    data.value = result;
    methods.updateConnection?.();
    update(id);
  };

  const [result, setResult] = useState(ZERO);

  const incBang = getSourceValue(bang.id);
  useEffect(updateNode, [incBang]);

  const incValues = [
    getSourceValue(first.id),
    getSourceValue(second.id),
  ];
  useEffect(() => {
    setResult(
      OperationFunc[type](...incValues.filter(isNumber))
    );
  }, [...incValues]);

  return (
    <Node
      compact
      className={cn(b(), className)}
      config={config}
      onClick={() => updateNode()}
    >
      <span>{MathSymbols[type]}</span>
    </Node>
  );
};

const Sum: FC<SumNodeT> = (props) => (
  <Operation
    className={createNodeClass(NodeTypes.Sum)}
    {...props}
  />
);

const Subtract: FC<SubtractNodeT> = (props) => (
  <Operation
    className={createNodeClass(NodeTypes.Subtract)}
    {...props}
  />
);

const Multiply: FC<MultiplyNodeT> = (props) => (
  <Operation
    className={createNodeClass(NodeTypes.Multiply)}
    {...props}
  />
);

const Divide: FC<DivideNodeT> = (props) => (
  <Operation
    className={createNodeClass(NodeTypes.Divide)}
    {...props}
  />
);

export { Sum, Subtract, Multiply, Divide };
