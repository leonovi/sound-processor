import { NodeTypes } from 'components/Flow/Flow.models';

export const CONTEXT_MENU_ITEMS = [
  {
    label: 'Modules',
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
        label: 'ADSR',
        nodeType: NodeTypes.ADSR,
      },
    ],
  },
  {
    label: 'Sources',
    items: [
      {
        label: 'Constant',
        nodeType: NodeTypes.CONSTANT,
      },
      {
        label: 'Sequencer',
        nodeType: NodeTypes.NOTE_SEQUENCER,
      },
      {
        label: 'Gate',
        nodeType: NodeTypes.GATE,
      },
    ],
  },
];
