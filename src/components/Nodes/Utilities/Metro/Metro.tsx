import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Metro.css';
import { Node } from 'components/Node/Node';
import { propsData } from 'components/Nodes/propsData';
import { NumberInput } from 'components/NumberInput/NumberInput';
import { NodeT } from 'utils/isNode';
import { noop } from 'utils/noop';
import { defer } from 'utils/defer';
import { useUpdate } from 'hooks/useUpdate';
import { useIncomers } from 'hooks/useIncomers';

const DEFAULT_MS = 1000;

const b = b_.with('metro-node');

const Metro: FC<NodeT<{}>> = ({ id, type }) => {
  const [ms, setMs] = useState(DEFAULT_MS);

  const [isActive, setIsActive] = useState(false);
  const on = () => setIsActive(true);
  const off = () => setIsActive(false);

  const update = useUpdate(id, isActive);

  useEffect(update, [isActive]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      on();
      defer(off);
    }, ms);
    return () => clearInterval(intervalId);
  }, [ms]);

  const incomers = useIncomers(id);
  useEffect(
    () =>
      incomers.length > 0 && typeof incomers[0].data.value === 'number'
        ? setMs(incomers[0].data.value)
        : noop,
    [incomers]
  );

  return (
    <Node className={b()} {...propsData.get(type)}>
      <NumberInput value={ms} onChange={(ms) => setMs(ms)} />
    </Node>
  );
};

export { Metro };
