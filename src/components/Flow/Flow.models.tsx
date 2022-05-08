import { EffectCallback } from 'react';
import {
  Node as FlowNode,
  Edge as FlowEdge,
} from 'react-flow-renderer';
import { NodeTypes } from 'components/Nodes/models';
import { ConfigT } from 'components/Node/Node.models';
import { Param, Signal, ToneAudioNode } from 'tone';
import { UnitMap } from 'tone/build/esm/core/type/Units';

export type NodeValueT = number | boolean | null;

export type NodeDataT = {
  value: NodeValueT;
  readonly config: ConfigT;
  readonly methods: {
    say: (phrase: string) => void;
    setParam: <T extends keyof UnitMap>(
      param: Param<T> | Signal<T>,
      setter: (param: Param<T> | Signal<T>) => void
    ) => void;
    executeAudioNode: (
      audioNode: ToneAudioNode
    ) => EffectCallback;
    updateConnection?: () => void;
  };
};

export type NodeParametersT = {
  readonly type: NodeTypes;
  data: NodeDataT;
};

export type FlowNodeT<
  T extends NodeParametersT = NodeParametersT
> = Overwrite<
  FlowNode,
  {
    type: T['type'];
    data: T['data'];
  }
>;

export type FlowEdgeT = FlowEdge;
