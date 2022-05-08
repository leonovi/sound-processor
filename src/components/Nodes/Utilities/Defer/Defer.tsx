import React, { FC, useEffect, useState } from 'react';
import { useUpdateNodeInternals } from 'react-flow-renderer';
import { isNumber } from 'tone';
import b_ from 'b_';
import './Defer.css';
import { Node } from 'components/Node/Node';
import { DeferNodeT } from './Defer.models';

import { useConnections } from 'store/useConnections';
import { Colors } from 'style-guide/colors';
import { flattenProps } from 'utils/flattenProps';

const b = b_.with('defer-node');

const RESET_TIMEOUT_MS = 100;

const DEFAULT_STEP_NUMBER = 0;
const DEFAULT_LENGTH = 2;

const getGradient = (p: number) => {
  return `linear-gradient(to right, ${
    Colors.Blue
  } 0% ${p}%, white ${p}% ${100 - p}%)`;
};

const Defer: FC<DeferNodeT> = (props) => {
  const {
    id,
    data,
    methods,
    config,
    inputs: { bang, steps },
  } = flattenProps<DeferNodeT>(props);

  const { getSourceValue } = useConnections();

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [stepNumber, setStepNumber] = useState(
    DEFAULT_STEP_NUMBER
  );

  const [stepLength, setStepLength] =
    useState(DEFAULT_LENGTH);

  const incrementStep = () =>
    setStepNumber((stepNumber) => stepNumber + 1);

  const reset = () => {
    setStepNumber(DEFAULT_STEP_NUMBER);
    setShouldUpdate(false);
  };

  const update = useUpdateNodeInternals();
  useEffect(() => {
    data.value = shouldUpdate;
    methods.updateConnection?.();
    update(id);
  }, [shouldUpdate]);

  useEffect(() => {
    if (shouldUpdate) {
      setTimeout(() => {
        reset();
      }, RESET_TIMEOUT_MS);
    }
  }, [shouldUpdate]);

  const incBang = getSourceValue(bang.id);
  useEffect(() => {
    if (stepNumber === stepLength) {
      setShouldUpdate(true);
    }

    const isBang = incBang === true;
    if (isBang) {
      incrementStep();
    }
  }, [incBang]);

  const incSteps = getSourceValue(steps.id);
  useEffect(() => {
    setStepLength(
      isNumber(incSteps) ? incSteps : DEFAULT_LENGTH
    );
  }, [incSteps]);

  return (
    <Node className={b()} config={config}>
      <div
        className={b('steps-line')}
        style={{
          background: getGradient(
            (stepNumber / stepLength) * 100
          ),
        }}
      />
    </Node>
  );
};

export { Defer };
