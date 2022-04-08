import { NodeCategories, NodeTypes } from 'components/Nodes/models';

export type ContextMenuItemT = {
  label: string;
  nodeType: NodeTypes;
};

export type ContextMenuItemsT = Array<{
  category: NodeCategories;
  items: Array<ContextMenuItemT>;
}>;

export type ContextMenuPropsT = {
  addNode: (type: NodeTypes, category: NodeCategories) => void;
};
