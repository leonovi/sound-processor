import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Switch.css';
import { propsData } from 'data/propsData';
import { Node } from 'components/Node/Node';
import { NodeT } from 'utils/isNode';
import { useIncomers } from 'hooks/useIncomers';
import { useUpdate } from 'hooks/useUpdate';

const SWITCH_QUANTITY = 4;

const SELECTED_INDEX = 0;

const SWITCHERS = new Array(SWITCH_QUANTITY).fill(null).map((_, id) => ({
  id,
  selected: id === SELECTED_INDEX,
}));

const b = b_.with('switcher-node');

const Switch: FC<NodeT<any>> = ({ id, type }) => {
  const [selectedId, setSelectedId] = useState(SELECTED_INDEX);
  const [elements, setElements] = useState(SWITCHERS);
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    setElements((elements) =>
      elements.map(({ id }) => ({
        id,
        selected: id === selectedId,
      }))
    );
  }, [selectedId]);

  const update = useUpdate(id, value);

  const incomers = useIncomers(id);
  useEffect(() => {
    if (incomers[selectedId]) {
      setValue(incomers[selectedId].data.value);
    }
  }, [incomers, selectedId]);

  useEffect(update, [value]);

  const props = propsData.get(type);
  return (
    <Node {...props}>
      <div className={b('container')}>
        {elements.map(({ id, selected }) => (
          <button
            className={b('switch', { selected })}
            onClick={() => setSelectedId(id)}
          >
            <div className={b('switch-inner')} />
          </button>
        ))}
      </div>
    </Node>
  );
};

export { Switch };
