import { NodeTypes } from 'models/NodeTypes';

export const contextMenuItems = [
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
    ],
  },
  {
    label: 'Destinations',
    items: [{ label: 'Destination', nodeType: NodeTypes.DESTINATION }],
  },
];
