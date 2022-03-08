import React, { FC, useEffect, useState } from 'react';
import { NodeProps, useUpdateNodeInternals } from 'react-flow-renderer';

import { Node } from 'components/Node/Node';
import { Source } from 'components/Flow/Flow.models';

const GateSource: FC<NodeProps<Source<boolean>>> = ({ id, data }) => {
  const updateNode = useUpdateNodeInternals();
  const [gate, setGate] = useState(false);

  useEffect(() => {
    data.value = gate;
    updateNode(id);
  }, [gate]);

  return (
    <Node label="Constant" output={{ id: '333' }}>
      <button
        onMouseDown={() => setGate(true)}
        onMouseUp={() => setGate(false)}
      >
        {gate ? '+' : '-'}
      </button>
    </Node>
  );
};

export { GateSource };
