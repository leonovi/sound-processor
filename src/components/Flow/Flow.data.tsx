import { Blank } from 'components/Nodes/Utilities/Blank/Blank';
import { NodeTypes } from './Flow.models';

export const BACKSPACE_KEYCODE = 8;
export const EDGE_TYPES = {}; // TODO create custom edge
export const NODE_TYPES = {
  [NodeTypes.BLANK]: Blank,
};
