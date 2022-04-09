import { FlowNodeT } from "components/Flow/Flow.models";
import { NodeTypes } from "components/Nodes/models";
import { NodeConfigT } from "data/configs";

type SwitchNodeOptionsT = {
  type: NodeTypes.Switch;
  data: {
    config: NodeConfigT<NodeTypes.Switch>;
    value: any;
  }
}

export type SwitchNodeT = FlowNodeT<SwitchNodeOptionsT>;
