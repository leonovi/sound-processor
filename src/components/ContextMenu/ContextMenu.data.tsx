import { NodeTypes } from 'components/Flow/Flow.models';
import { ContextMenuItemsT } from './ContextMenu.models';

export const ContextMenuItemsData: ContextMenuItemsT = [
  {
    label: 'Utilities',
    items: [],
  },
  {
    label: 'Math',
    items: [{ label: 'Sum', nodeType: NodeTypes.SUM }, { label: 'Number', nodeType: NodeTypes.NUMBER }],
  },
];
