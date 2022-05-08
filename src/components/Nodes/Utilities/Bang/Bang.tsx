import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Bang.css';
import { Node } from 'components/Node/Node';
import { BangNodeT } from './Bang.models';
import { flattenProps } from 'utils/flattenProps';
import { useConnections } from 'store/useConnections';
import { useUpdateNodeInternals } from 'react-flow-renderer';

const OFF_TIMEOUT_MS = 100;

const b = b_.with('bang-node');

const Bang: FC<BangNodeT> = (props) => {
  const {
    id,
    data,
    methods,
    config,
    inputs: { input: bang },
  } = flattenProps<BangNodeT>(props);

  const { getSourceValue } = useConnections();

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const on = () => setShouldUpdate(true);
  const off = () => setShouldUpdate(false);
  const onMouseDown = on;
  const onMouseUp = off;

  const update = useUpdateNodeInternals();
  useEffect(() => {
    data.value = shouldUpdate;
    methods.updateConnection?.();
    update(id);
  }, [shouldUpdate]);

  useEffect(() => {
    if (shouldUpdate) {
      setTimeout(() => {
        off();
      }, OFF_TIMEOUT_MS);
    }
  }, [shouldUpdate]);

  const incBang = getSourceValue(bang.id);
  useEffect(() => {
    setShouldUpdate(Boolean(incBang));
  }, [incBang]);

  return (
    <Node compact className={b()} config={config}>
      <button
        className={b('bang', { pressed: shouldUpdate })}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </Node>
  );
};

export { Bang };
