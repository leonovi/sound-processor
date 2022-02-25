import { NodeTypes } from "models/nodeTypes";

export const contextMenuItems = [
  {
    label: 'Processors',
    items: [{ label: 'Noise processor', nodeType: NodeTypes.NOISE_PROCESSOR }],
  },
  {
    label: 'Destinations',
    items: [{ label: 'Destination', nodeType: NodeTypes.DESTINATION }],
  },
];
