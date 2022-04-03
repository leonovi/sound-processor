import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Metro.css';
import { Node } from 'components/Node/Node';
import { NumberInput } from 'components/NumberInput/NumberInput';
import { NodeT } from 'utils/isNode';
import { defer } from 'utils/defer';
import { useUpdate } from 'hooks/useUpdate';
import { NodeTypes } from 'components/Nodes/models';
import { useNodes } from 'hooks/useNodes';
import { getNode } from 'utils/getNode';
import { useConnection } from 'hooks/useConnection';
import { useProps } from 'hooks/useProps';

const DEFAULT_MS = 1000;

const b = b_.with('metro-node');

const Metro: FC<NodeT<boolean, NodeTypes.Metro>> = ({ id, type }) => {
  const props = useProps(type);
  const {
    inputs: { metroInputMs },
  } = props;

  const [ms, setMs] = useState(DEFAULT_MS);

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const on = () => setShouldUpdate(true);
  const off = () => setShouldUpdate(false);

  useConnection(metroInputMs.id, setMs);

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
    <Node className={b()} {...props}>
      <NumberInput value={ms} onChange={(ms) => setMs(ms)} />
    </Node>
  );
};

export { Metro };
