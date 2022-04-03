import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Bang.css';
import { Node } from 'components/Node/Node';
import { NodeT } from 'utils/isNode';
import { useUpdate } from 'hooks/useUpdate';
import { NodeTypes } from 'components/Nodes/models';
import { useConnection } from 'hooks/useConnection';
import { useProps } from 'hooks/useProps';

const OFF_TIMEOUT_MS = 100;

const b = b_.with('bang-node');

const Bang: FC<NodeT<boolean, NodeTypes.Bang>> = ({ id, type }) => {
  const props = useProps(type);
  const {
    inputs: { bangInput },
  } = props;

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const on = () => setShouldUpdate(true);
  const off = () => setShouldUpdate(false);

  useConnection(bangInput.id, (value) => {
    const isBang = value === true;
    if (isBang) {
      setShouldUpdate(true);
    }
  });

  const update = useUpdate(id, shouldUpdate);
  useEffect(() => {
    update();
  }, [shouldUpdate]);

  useEffect(() => {
    if (shouldUpdate) {
      setTimeout(() => {
        off();
      }, OFF_TIMEOUT_MS);
    }
  }, [shouldUpdate]);

  const onMouseDown = on;
  const onMouseUp = off;

  return (
    <Node compact className={b()} {...props}>
      <button
        className={b('bang', { pressed: shouldUpdate })}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </Node>
  );
};

export { Bang };
