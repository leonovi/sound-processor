import { NodeTypes, NodeCategories } from 'components/Nodes/models';
import { ContextMenuItemsT } from 'components/ContextMenu/ContextMenu.models';

export const contextMenuData: ContextMenuItemsT = [
  {
    label: NodeCategories.Utilities,
    items: [
      { label: 'Bang', nodeType: NodeTypes.Bang },
      { label: 'Metro', nodeType: NodeTypes.Metro },
      { label: 'Switch', nodeType: NodeTypes.Switch },
      { label: 'Defer', nodeType: NodeTypes.Defer },
    ],
  },
  {
    label: NodeCategories.Math,
    items: [
      { label: 'Sum', nodeType: NodeTypes.Sum },
      { label: 'Number', nodeType: NodeTypes.Number },
    ],
  },
];
