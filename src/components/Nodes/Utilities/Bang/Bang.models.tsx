import { FlowNodeT } from "components/Flow/Flow.models";
import { NodeTypes } from "components/Nodes/models";
import { NodeConfigT } from "data/configs";

type BangNodeOptionsT = {
  type: NodeTypes.Bang;
  data: {
    config: NodeConfigT<NodeTypes.Bang>;
    value: boolean; // Maybe special type BangValueT
  }
}

export type BangNodeT = FlowNodeT<BangNodeOptionsT>;
