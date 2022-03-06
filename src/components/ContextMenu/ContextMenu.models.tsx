import { NodeTypes } from 'models/NodeTypes';

export const CONTEXT_MENU_ITEMS = [
  {
    label: 'Processors',
    items: [
      { label: 'Noise', nodeType: NodeTypes.NOISE },
      {
        label: 'Oscillator',
        nodeType: NodeTypes.OSCILLATOR,
      },
      {
        label: 'Gain',
        nodeType: NodeTypes.GAIN,
      },
      {
        label: 'Constant Source',
        nodeType: NodeTypes.CONSTANT_SOURCE,
      },
      {
        label: 'Sequencer',
        nodeType: NodeTypes.SEQUENCER,
      },
    ],
  },
];
