import { NodeTypes } from 'utils/nodeTypes';

export const contextMenuItems = [
  {
    label: 'Processors',
    items: [
      { label: 'Noise processor', nodeType: NodeTypes.NOISE_PROCESSOR },
      {
        label: 'Oscillator processor',
        nodeType: NodeTypes.OSCILLATOR_PROCESSOR,
      },
    ],
  },
  {
    label: 'Destinations',
    items: [{ label: 'Destination', nodeType: NodeTypes.DESTINATION }],
  },
];
