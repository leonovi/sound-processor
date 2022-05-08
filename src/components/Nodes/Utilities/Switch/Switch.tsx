import React, {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import b_ from 'b_';
import './Switch.css';
import { Node } from 'components/Node/Node';
import { useInternalUpdate } from 'hooks/useUpdate';
import { isUndefined } from 'utils/isUndefined';
import { SelectedIdT, SwitchNodeT } from './Switch.models';
import { useInputsValues } from 'hooks/useInputsValues';
import { NodeValueT } from 'components/Flow/Flow.models';
import {
  createAdditionalInput,
  createAdditionalInputKey,
  createSwitchers,
} from './Switch.utils';
import { flattenProps } from 'utils/flattenProps';
import { useConnections } from 'store/useConnections';
import { isNumber } from 'tone';
import { useUpdateNodeInternals } from 'react-flow-renderer';
import { isNull } from 'utils/isNull';

const DEFAULT_SWITCH_QTY = 4;

const AddSwitchButton: FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <button
    className={b('add')}
    onClick={onClick}
    children="+"
  />
);

const Switcher: FC<{
  id: number;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}> = ({ id, selected, disabled, onClick }) => (
  <button
    key={id}
    className={b('switch', { selected, disabled })}
    onClick={onClick}
  >
    <div className={b('switch-inner')} />
  </button>
);

const b = b_.with('switcher-node');

const Switch: FC<SwitchNodeT> = (props) => {
  const { id, data, methods, config, name, inputs } =
    flattenProps<SwitchNodeT>(props);

  const { getSourceValue } = useConnections();

  const [selectedId, setSelectedId] =
    useState<SelectedIdT>(null);

  const [outputValue, setOutputValue] =
    useState<NodeValueT>(null);

  const [qty, setQty] = useState(DEFAULT_SWITCH_QTY);

  const switchersData = useMemo(
    () => createSwitchers(qty, selectedId),
    [qty, selectedId]
  );

  const additionalInputs = useMemo(() => {
    if (qty <= DEFAULT_SWITCH_QTY) {
      return;
    }

    return Object.fromEntries(
      new Array(qty - DEFAULT_SWITCH_QTY)
        .fill(null)
        .map((_, id) => [
          createAdditionalInputKey(id),
          createAdditionalInput(id),
        ])
    );
  }, [qty]);

  const extendedInputs = isUndefined(additionalInputs)
    ? inputs
    : {
        ...inputs,
        ...additionalInputs,
      };

  const values = Object.values(extendedInputs).map(
    (input) => getSourceValue(input.id)
  );
  // .filter(isNumber);

  useEffect(() => {
    const shouldSetValue =
      !isNull(selectedId) &&
      !isNull(values[selectedId]) &&
      !isUndefined(values[selectedId]);

    const value = shouldSetValue
      ? values[selectedId]
      : null;

    setOutputValue(value);
  }, [values]);

  const update = useUpdateNodeInternals();
  useEffect(() => {
    data.value = outputValue;
    methods.updateConnection?.();
    update(id);
  }, [outputValue]);

  console.log(values);

  return (
    <Node
      config={{
        ...config,
        name: `${name} ${qty}`,
        inputs: extendedInputs,
      }}
    >
      <AddSwitchButton
        onClick={() => setQty((qty) => qty + 1)}
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
            disabled={isNull(values[id])}
            onClick={() =>
              !isNull(values[id]) && setSelectedId(id)
            }
          />
        ))}
      </div>
    </Node>
  );
};

export { Switch };
