import { FlowNodeT, NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type SumNodeOptionsT = {
  type: NodeTypes.Sum;
  data: {
    config: typeof configs[NodeTypes.Sum];
    value: number;
  };
};

type SubtractNodeOptionsT = {
  type: NodeTypes.Subtract;
  data: {
    config: typeof configs[NodeTypes.Subtract];
    value: number;
  };
};

type MultiplyNodeOptionsT = {
  type: NodeTypes.Multiply;
  data: {
    config: typeof configs[NodeTypes.Multiply];
    value: number;
  };
};

type DivideNodeOptionsT = {
  type: NodeTypes.Divide;
  data: {
    config: typeof configs[NodeTypes.Divide];
    value: number;
  };
};

export type SumNodeT = FlowNodeT<SumNodeOptionsT>;
export type SubtractNodeT = FlowNodeT<SubtractNodeOptionsT>;
export type MultiplyNodeT = FlowNodeT<MultiplyNodeOptionsT>;
export type DivideNodeT = FlowNodeT<DivideNodeOptionsT>;

export type MathOperationNodeT = FlowNodeT<
  | SumNodeOptionsT
  | SubtractNodeOptionsT
  | MultiplyNodeOptionsT
  | DivideNodeOptionsT
>;

export type MathOperationNodePropsT = {
  symbol: string;
  operation: (...values: Array<number>) => number;
}
