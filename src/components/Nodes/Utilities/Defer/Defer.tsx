import React, { FC, useEffect, useMemo, useState } from 'react';
import b_ from 'b_';
import './Defer.css';
import { Node } from 'components/Node/Node';
import { NodeT } from 'utils/isNode';
import { propsData } from 'data/propsData';
import { useUpdate } from 'hooks/useUpdate';
import { Colors } from 'style-guide/colors';
import { isUndefined } from 'utils/isUndefined';
import { useEdges } from 'hooks/useEdges';
import { useNodes } from 'hooks/useNodes';
import { find } from 'utils/find';
import { getConnectedEdges } from 'react-flow-renderer';
import { getNode } from 'utils/getNode';
import { NodeTypes } from 'components/Nodes/models';
import { getEdge } from 'utils/getEdge';
import { useConnection } from 'hooks/useConnection';
import { useProps } from 'hooks/useProps';

const b = b_.with('defer-node');

const RESET_TIMEOUT_MS = 100;

const DEFAULT_STEP_NUMBER = 0;
const DEFAULT_LENGTH = 2;

const getGradient = (p: number) => {
  return `linear-gradient(to right, ${Colors.Blue} 0% ${p}%, white ${p}% ${
    100 - p
  }%)`;
};

const Defer: FC<NodeT<boolean, NodeTypes.Defer>> = ({ id, type }) => {
  const props = useProps(type);
  const {
    inputs: { deferInputBang, deferInputStepsQty },
  } = props;

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [stepNumber, setStepNumber] = useState(DEFAULT_STEP_NUMBER);
  const [stepLength, setStepLength] = useState(DEFAULT_LENGTH);

  const incrementStep = () => setStepNumber((stepNumber) => stepNumber + 1);
  const reset = () => {
    setStepNumber(DEFAULT_STEP_NUMBER);
    setShouldUpdate(false);
  };

  useConnection(deferInputBang.id, (value) => {
    if (stepNumber === stepLength) {
      setShouldUpdate(true);
    }

    const isBang = value === true;
    if (isBang) {
      incrementStep();
    }
  });

  useConnection(deferInputStepsQty.id, setStepLength);

  const update = useUpdate(id, shouldUpdate);
  useEffect(() => {
    update();
  }, [shouldUpdate]);

  useEffect(() => {
    if (shouldUpdate) {
      setTimeout(() => {
        reset();
      }, RESET_TIMEOUT_MS);
    }
  }, [shouldUpdate]);

  return (
    <Node className={b()} {...props}>
      <div
        className={b('steps-line')}
        style={{
          background: getGradient((stepNumber / stepLength) * 100),
        }}
      />
    </Node>
  );
};

export { Defer };
