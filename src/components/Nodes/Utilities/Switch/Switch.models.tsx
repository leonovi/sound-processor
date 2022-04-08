import { FlowNodeT } from "components/Flow/Flow.models";
import { NodeTypes } from "components/Nodes/models";
import { configs } from "data/configs";

type SwitchNodeOptionsT = {
  type: NodeTypes.Switch;
  data: {
    config: typeof configs[NodeTypes.Switch];
    value: any;
  }
}

export type SwitchNodeT = FlowNodeT<SwitchNodeOptionsT>;
