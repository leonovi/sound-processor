import React, { FC, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import {Node} from "components/Node/Node";
import { Mode, Parameters } from "worklets/AdsrProcessor/AdsrProcessor.models";
import { Module } from "components/Flow/Flow.models";
import { extractModule } from "utils/extractModule";
import { SOURCE_TYPE } from "components/Node/Channel/Channel.models";
import { InputController } from "components/Controllers/InputController/InputController";
import { useProcessorParameter } from "hooks/useProcessorParameter";

const AdsrModule: FC<NodeProps<Module>> = ({ data, id }) => {
  const module = extractModule(data);

  const [a, setA] = useState(0.2);
  const [d, setD] = useState(0.2);
  const [s, setS] = useState(0.2);
  const [r, setR] = useState(1);

  useProcessorParameter({
    name: Parameters.AttackTime,
    module,
    value: a,
  });
  useProcessorParameter({
    name: Parameters.DecayTime,
    module,
    value: d,
  });
  useProcessorParameter({
    name: Parameters.SustainLevel,
    module,
    value: s,
  });
  useProcessorParameter({
    name: Parameters.ReleaseTime,
    module,
    value: r,
  });

  return (
    <Node
    label="ADSR"
      input={{id: '67667'}}
      output={{id: '7678687'}}
      parameters={[
        {
          label: 'A',
          channel: { id: 'a', type: SOURCE_TYPE },
          controller: (
            <InputController
              value={a}
              minValue={0}
              maxValue={1}
              step={0.1}
              onChange={(value) => setA(value)}
            />
          ),
        },
        {
          label: 'D',
          channel: { id: 'd', type: SOURCE_TYPE },
          controller: (
            <InputController
              value={d}
              minValue={0}
              maxValue={1}
              step={0.1}
              onChange={(value) => setD(value)}
            />
          ),
        },
        {
          label: 'S',
          channel: { id: 's', type: SOURCE_TYPE },
          controller: (
            <InputController
              value={s}
              minValue={0}
              maxValue={1}
              step={0.1}
              onChange={(value) => setS(value)}
            />
          ),
        },
        {
          label: 'R',
          channel: { id: 'r', type: SOURCE_TYPE },
          controller: (
            <InputController
              value={r}
              minValue={0}
              maxValue={1}
              step={0.1}
              onChange={(value) => setR(value)}
            />
          ),
        },
      ]}
    >
    </Node>
  );
}

export { AdsrModule };
