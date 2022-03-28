import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Bang.css';
import { Node } from 'components/Node/Node';
import { propsData } from 'data/propsData';
import { NodeT } from 'utils/isNode';
import { useUpdate } from 'hooks/useUpdate';
import { useIncomers } from 'hooks/useIncomers';
import { noop } from 'utils/noop';

const b = b_.with('bang-node');

const Bang: FC<NodeT<{}>> = ({ id, type }) => {
  const [isActive, setIsActive] = useState(false);
  const on = () => setIsActive(true);
  const off = () => setIsActive(false);

  const incomers = useIncomers(id);
  useEffect(
    () => (incomers.length > 0 ? setIsActive(incomers[0].data.value) : noop),
    [incomers]
  );

  const update = useUpdate(id, isActive);

  useEffect(update, [isActive]);

  const onMouseDown = on;
  const onMouseUp = off;

  return (
    <Node withoutHeader className={b()} {...propsData.get(type)}>
      <button
        className={b('bang')}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </Node>
  );
};

export { Bang };
