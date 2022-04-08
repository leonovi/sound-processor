import React, { FC, useEffect, useMemo, useState } from 'react';
import b_ from 'b_';
import './Defer.css';
import { Colors } from 'style-guide/colors';
import { useUpdate } from 'hooks/useUpdate';
import { useConnection } from 'hooks/useConnection';
import { Node } from 'components/Node/Node';
import { DeferNodeT } from './Defer.models';

const b = b_.with('defer-node');

const RESET_TIMEOUT_MS = 100;

const DEFAULT_STEP_NUMBER = 0;
const DEFAULT_LENGTH = 2;

const getGradient = (p: number) => {
  return `linear-gradient(to right, ${Colors.Blue} 0% ${p}%, white ${p}% ${
    100 - p
  }%)`;
};

const Defer: FC<DeferNodeT> = (props) => {
  const {
    id,
    data: {
      config: { name, category, inputs, outputs },
    },
  } = props;

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [stepNumber, setStepNumber] = useState(DEFAULT_STEP_NUMBER);
  const [stepLength, setStepLength] = useState(DEFAULT_LENGTH);

  const incrementStep = () => setStepNumber((stepNumber) => stepNumber + 1);
  const reset = () => {
    setStepNumber(DEFAULT_STEP_NUMBER);
    setShouldUpdate(false);
  };

  useConnection(inputs.deferInputBang.id, (value) => {
    if (stepNumber === stepLength) {
      setShouldUpdate(true);
    }

    const isBang = value === true;
    if (isBang) {
      incrementStep();
    }
  });

  useConnection(inputs.deferInputStepsQty.id, setStepLength);

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
    <Node
      className={b()}
      name={name}
      category={category}
      inputs={inputs}
      outputs={outputs}
    >
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
