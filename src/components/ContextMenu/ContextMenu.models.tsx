import { NodeTypes } from "components/Nodes/data";

type ContextMenuItemT = {
  label: string;
  nodeType: NodeTypes;
};

export type ContextMenuItemsT = Array<{
  label: string;
  items: Array<ContextMenuItemT>;
}>;

export type ContextMenuPropsT = {
  addNode: (type: NodeTypes) => void;
};
