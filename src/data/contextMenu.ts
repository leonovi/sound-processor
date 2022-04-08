import { NodeTypes, NodeCategories } from 'components/Nodes/models';
import { ContextMenuItemsT } from 'components/ContextMenu/ContextMenu.models';

export const contextMenuData: ContextMenuItemsT = [
  {
    category: NodeCategories.Utilities,
    items: [
      { label: 'Bang', nodeType: NodeTypes.Bang },
      { label: 'Metro', nodeType: NodeTypes.Metro },
      { label: 'Switch', nodeType: NodeTypes.Switch },
      { label: 'Defer', nodeType: NodeTypes.Defer },
    ],
  },
  {
    category: NodeCategories.Math,
    items: [
      { label: 'Sum', nodeType: NodeTypes.Sum },
      { label: 'Number', nodeType: NodeTypes.Number },
    ],
  },
  {
    category: NodeCategories.Audio,
    items: [
      { label: 'Oscillator', nodeType: NodeTypes.Oscillator },
      { label: 'Destination', nodeType: NodeTypes.Destination },
    ],
  },
];
