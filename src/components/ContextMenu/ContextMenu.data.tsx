import { NodeTypes } from 'components/Nodes/data';
import { ContextMenuItemsT } from './ContextMenu.models';

export const ContextMenuItemsData: ContextMenuItemsT = [
  {
    label: 'Utilities',
    items: [{ label: 'Bang', nodeType: NodeTypes.Bang }, { label: 'Metro', nodeType: NodeTypes.Metro }],
  },
  {
    label: 'Math',
    items: [{ label: 'Sum', nodeType: NodeTypes.Sum }, { label: 'Number', nodeType: NodeTypes.Number }],
  },
];
