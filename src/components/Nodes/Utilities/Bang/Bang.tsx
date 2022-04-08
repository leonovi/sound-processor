import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Bang.css';
import { useUpdate } from 'hooks/useUpdate';
import { useConnection } from 'hooks/useConnection';
import { Node } from 'components/Node/Node';
import { BangNodeT } from './Bang.models';

const OFF_TIMEOUT_MS = 100;

const b = b_.with('bang-node');

const Bang: FC<BangNodeT> = (props) => {
  const {
    id,
    data: {
      config: { name, category, inputs, outputs },
    },
  } = props;

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const on = () => setShouldUpdate(true);
  const off = () => setShouldUpdate(false);

  useConnection(inputs.bangInput.id, (value) => {
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
    <Node
      compact
      className={b()}
      name={name}
      category={category}
      inputs={inputs}
      outputs={outputs}
    >
      <button
        className={b('bang', { pressed: shouldUpdate })}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </Node>
  );
};

export { Bang };
