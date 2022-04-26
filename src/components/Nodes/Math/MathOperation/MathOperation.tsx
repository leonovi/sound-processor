import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import b_ from 'b_';
import './MathOperation.css';
import { Node } from 'components/Node/Node';

import { useUpdate } from 'hooks/useUpdate';
import { useConnection } from 'hooks/useConnection';
import { useInputsValues } from 'hooks/useInputsValues';

import { createNodeClass } from 'utils/createNodeClass';
import { divide, multiply, subtract, sum } from 'utils/math';

import { NodeTypes } from 'components/Nodes/models';
import {
  DivideNodeT,
  MultiplyNodeT,
  MathOperationNodePropsT,
  MathOperationNodeT,
  SubtractNodeT,
  SumNodeT,
} from './MathOperation.models';

const INPUTS_QTY = 2; // Maybe more in the future (<AddInputButton />) look Switch.tsx
const DEFAULT_VALUE = 0;

const MathSymbols = {
  [NodeTypes.Sum]: '+',
  [NodeTypes.Subtract]: '-',
  [NodeTypes.Multiply]: '*',
  [NodeTypes.Divide]: '/',
};

const b = b_.with('operation-node');

const MathOperation: FC<MathOperationNodeT & MathOperationNodePropsT> = ({
  id,
  data,
  symbol,
  operation,
  className,
}) => {
  /*

  const firstInputNode = useSelector(selectFirstInputNode)
  const secondInputNode = useSelector(selectSecondInputNode)

  */

  const {
    inputs: { operationInputBang, operationInput1, operationInput2 },
  } = data.config;
  const inputsValues = useInputsValues({ operationInput1, operationInput2 });

  const [value, setValue] = useState(DEFAULT_VALUE);
  useEffect(() => setValue(operation(...inputsValues)), [inputsValues]);

  const update = useUpdate(id, value);
  useConnection(operationInputBang.id, (value) => {
    const isBang = value === true;
    if (isBang) {
      update();
    }
  });

  return (
    <Node
      compact
      className={cn(b(), className)}
      {...data.config}
      onClick={() => update()}
    >
      <span>{symbol}</span>
    </Node>
  );
};

const Sum: FC<SumNodeT> = (props) => (
  <MathOperation
    className={createNodeClass(NodeTypes.Sum)}
    symbol={MathSymbols[NodeTypes.Sum]}
    operation={sum}
    {...props}
  />
);

const Subtract: FC<SubtractNodeT> = (props) => (
  <MathOperation
    className={createNodeClass(NodeTypes.Subtract)}
    symbol={MathSymbols[NodeTypes.Subtract]}
    operation={subtract}
    {...props}
  />
);

const Multiply: FC<MultiplyNodeT> = (props) => (
  <MathOperation
    className={createNodeClass(NodeTypes.Multiply)}
    symbol={MathSymbols[NodeTypes.Multiply]}
    operation={multiply}
    {...props}
  />
);

const Divide: FC<DivideNodeT> = (props) => (
  <MathOperation
    className={createNodeClass(NodeTypes.Divide)}
    symbol={MathSymbols[NodeTypes.Divide]}
    operation={divide}
    {...props}
  />
);

export { Sum, Subtract, Multiply, Divide };
