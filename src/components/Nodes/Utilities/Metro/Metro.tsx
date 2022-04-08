import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Metro.css';
import { Node } from 'components/Node/Node';
import { NumberInput } from 'components/NumberInput/NumberInput';
import { useUpdate } from 'hooks/useUpdate';
import { useConnection } from 'hooks/useConnection';
import { defer } from 'utils/defer';
import { MetroNodeT } from './Metro.models';

const DEFAULT_MS = 1000;

const b = b_.with('metro-node');

const Metro: FC<MetroNodeT> = (props) => {
  const {
    id,
    data: {
      config: { name, category, inputs, outputs },
    },
  } = props;

  const [ms, setMs] = useState(DEFAULT_MS);

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const on = () => setShouldUpdate(true);
  const off = () => setShouldUpdate(false);

  useConnection(inputs.metroInputMs.id, setMs);

  useEffect(() => {
    const intervalId = setInterval(() => {
      on();
      defer(off);
    }, ms);
    return () => clearInterval(intervalId);
  }, [ms]);

  const update = useUpdate(id, shouldUpdate);
  useEffect(() => {
    update();
  }, [shouldUpdate]);

  return (
    <Node
      className={b()}
      name={name}
      category={category}
      inputs={inputs}
      outputs={outputs}
    >
      <NumberInput value={ms} onChange={(ms) => setMs(ms)} />
    </Node>
  );
};

export { Metro };
