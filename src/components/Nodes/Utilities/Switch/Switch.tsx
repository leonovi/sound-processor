import React, { FC, useEffect, useMemo, useState } from 'react';
import b_ from 'b_';
import './Switch.css';
import { propsData } from 'data/propsData';
import { Node } from 'components/Node/Node';
import { NodeT } from 'utils/isNode';
import { useIncomers } from 'hooks/useIncomers';
import { useUpdate } from 'hooks/useUpdate';
import { InputT, NodeTypes, TypeOfData } from 'components/Nodes/models';
import { useNodes } from 'hooks/useNodes';
import { getNode } from 'utils/getNode';
import { generateId } from 'utils/generateId';
import { isUndefined } from 'utils/isUndefined';
import { useConnection } from 'hooks/useConnection';
import { useEdges } from 'hooks/useEdges';
import { getConnectedEdges } from 'react-flow-renderer';
import { getEdge } from 'utils/getEdge';
import { useProps } from 'hooks/useProps';

const DEFAULT_SWITCH_QTY = 4;
const DEFAULT_SELECTED_ID = 0;

const createSwitcher = (id: number, selected: boolean) => ({ id, selected });

const createAdditionalInputKey = (id: number) => {
  return `switchAdditionalInput${id + 1}`;
};

const createAdditionalInput = (id: number) => ({
  id: generateId('SWITCH_ADDITIONAL_INPUT'),
  datatype: TypeOfData.Any,
  hint: `Switch additional input #${id + 1} | any`,
});

const AddSwitchButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className={b('add')} onClick={onClick} children="+" />
);

const Switcher: FC<{ id: number; selected: boolean; onClick: () => void }> = ({
  id,
  selected,
  onClick,
}) => (
  <button key={id} className={b('switch', { selected })} onClick={onClick}>
    <div className={b('switch-inner')} />
  </button>
);

const b = b_.with('switcher-node');

const Switch: FC<NodeT<any, NodeTypes.Switch>> = ({ id, type }) => {
  const props = useProps(type);

  const nodes = useNodes();
  const edges = useEdges();
  const connectedEdges = getConnectedEdges(nodes, edges);

  const [switchQty, setSwitchQty] = useState(DEFAULT_SWITCH_QTY);
  const [selectedId, setSelectedId] = useState(DEFAULT_SELECTED_ID);
  const [outputValue, setOutputValue] = useState();

  const switchersData = useMemo(() => {
    return new Array(switchQty)
      .fill(null)
      .map((_, id) => createSwitcher(id, id === selectedId));
  }, [switchQty, selectedId]);

  const additionalInputs = useMemo(() => {
    if (switchQty <= DEFAULT_SWITCH_QTY) {
      return;
    }

    return {
      ...Object.fromEntries(
        new Array(switchQty - DEFAULT_SWITCH_QTY)
          .fill(null)
          .map((_, id) => [
            createAdditionalInputKey(id),
            createAdditionalInput(id),
          ])
      ),
    };
  }, [switchQty]);

  const inputs = isUndefined(additionalInputs)
    ? props.inputs
    : {
        ...props.inputs,
        ...additionalInputs,
      };

  const getValue = ({ id }: InputT) => {
    const connectedEdge = getEdge(connectedEdges, id);
    const connectedNode = getNode(nodes, connectedEdge?.source);

    return isUndefined(connectedNode) ? null : connectedNode.data.value;
  };

  const switcherValues = useMemo(() => {
    return Object.values({
      ...props.inputs,
      ...additionalInputs,
    }).map(getValue);
  }, [connectedEdges, inputs]);

  useEffect(() => {
    setOutputValue(switcherValues[selectedId]);
  }, [switcherValues]);

  const update = useUpdate(id, outputValue);
  useEffect(() => {
    update();
  }, [outputValue]);

  return (
    <Node {...props} name={`${props.name} ${switchQty}`} inputs={inputs}>
      <AddSwitchButton
        onClick={() => setSwitchQty((switchQty) => switchQty + 1)}
      />
      {/*
        <RemoveSwitchButton
          onClick={() => setSwitchQty((switchQty) => switchQty - 1)}
        /> // Trouble with delete react-flow connection
      */}
      <div className={b('container')}>
        {switchersData.map(({ id, selected }) => (
          <Switcher
            key={id}
            id={id}
            selected={selected}
            onClick={() => setSelectedId(id)}
          />
        ))}
      </div>
    </Node>
  );
};

export { Switch };
