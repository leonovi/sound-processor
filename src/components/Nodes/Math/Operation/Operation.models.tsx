import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

type SumNodeOptionsT = {
  type: NodeTypes.Sum;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Sum];
    value: number;
  };
};

type SubtractNodeOptionsT = {
  type: NodeTypes.Subtract;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Subtract];
    value: number;
  };
};

type MultiplyNodeOptionsT = {
  type: NodeTypes.Multiply;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Multiply];
    value: number;
  };
};

type DivideNodeOptionsT = {
  type: NodeTypes.Divide;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Divide];
    value: number;
  };
};

export type SumNodeT = FlowNodeT<SumNodeOptionsT>;
export type SubtractNodeT = FlowNodeT<SubtractNodeOptionsT>;
export type MultiplyNodeT = FlowNodeT<MultiplyNodeOptionsT>;
export type DivideNodeT = FlowNodeT<DivideNodeOptionsT>;

export type OperationNodeT = FlowNodeT<
  | SumNodeOptionsT
  | SubtractNodeOptionsT
  | MultiplyNodeOptionsT
  | DivideNodeOptionsT
>;
