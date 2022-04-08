import { NodeTypes } from 'components/Nodes/models';
import { Node as FlowNode } from 'react-flow-renderer';

type NodeParametersT = {
  type: NodeTypes;
  data: any;
};

export type FlowNodeT<T extends NodeParametersT = NodeParametersT> = Overwrite<
  FlowNode,
  {
    type: T['type'];
    data: T['data'];
  }
>;
