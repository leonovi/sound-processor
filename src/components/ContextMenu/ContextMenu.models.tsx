import { NodeTypes } from 'components/Flow/Flow.models';

export type ContextMenuItemsT = Array<{
  label: string;
  items: Array<{
    label: string;
    nodeType: NodeTypes;
  }>;
}>;

export const CONTEXT_MENU_ITEMS: ContextMenuItemsT = [
  {
    label: 'Utilities',
    items: [
      { label: 'Blank', nodeType: NodeTypes.BLANK },
    ],
  },
];
