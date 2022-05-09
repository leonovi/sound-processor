import React, { FC, useEffect, useState } from 'react';
import { useUpdateNodeInternals } from 'react-flow-renderer';
import { isNumber } from 'tone';
import b_ from 'b_';
import './Metro.css';
import { Node } from 'components/Node/Node';
import { MetroNodeT } from './Metro.models';

import { NumberInput } from 'components/NumberInput/NumberInput';
import { useConnections } from 'store/connections';
import { defer } from 'utils/defer';
import { flattenProps } from 'utils/flattenProps';

const DEFAULT_INTERVAL = 1000;

const b = b_.with('metro-node');

const Metro: FC<MetroNodeT> = (props) => {
  const {
    id,
    data,
    methods,
    config,
    inputs: { ms: msInput },
  } = flattenProps<MetroNodeT>(props);

  const { getSourceValue } = useConnections();

  const [ms, setMs] = useState(DEFAULT_INTERVAL);

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const on = () => setShouldUpdate(true);
  const off = () => setShouldUpdate(false);

  const incMs = getSourceValue(msInput.id);
  useEffect(() => {
    setMs(isNumber(incMs) ? incMs : DEFAULT_INTERVAL);
  }, [incMs]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      on();
      defer(off);
    }, ms);
    return () => clearInterval(intervalId);
  }, [ms]);

  const update = useUpdateNodeInternals();
  useEffect(() => {
    data.value = shouldUpdate;
    methods.updateConnection?.();
    update(id);
  }, [shouldUpdate]);

  return (
    <Node className={b()} config={config}>
      <NumberInput
        value={ms}
        onChange={(ms) => setMs(ms)}
      />
    </Node>
  );
};

export { Metro };
