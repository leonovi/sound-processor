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
      { label: 'Number', nodeType: NodeTypes.Number },
      { label: 'Sum', nodeType: NodeTypes.Sum },
      { label: 'Subtract', nodeType: NodeTypes.Subtract },
      { label: 'Divide', nodeType: NodeTypes.Divide },
      { label: 'Multiply', nodeType: NodeTypes.Multiply },
    ],
  },
  {
    category: NodeCategories.Audio,
    items: [
      { label: 'Sine', nodeType: NodeTypes.Sine },
      { label: 'Triangle', nodeType: NodeTypes.Triangle },
      { label: 'Sawtooth', nodeType: NodeTypes.Sawtooth },
      { label: 'Square', nodeType: NodeTypes.Square },
      { label: 'Destination', nodeType: NodeTypes.Destination },
      { label: 'Analyser', nodeType: NodeTypes.Analyser },
      { label: 'Noise', nodeType: NodeTypes.Noise },
      { label: 'BiquadFilter', nodeType: NodeTypes.BiquadFilter },
    ],
  },
];
