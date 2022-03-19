import { NodeTypes } from './Flow.models';

import { Sum } from 'components/Nodes/Math/Sum/Sum';
import { Number } from 'components/Nodes/Math/Number/Number';

export const BACKSPACE_KEYCODE = 8;

export const EDGE_TYPES = {}; // TODO create custom edge

export const NODE_TYPES = {
  [NodeTypes.SUM]: Sum,
  [NodeTypes.NUMBER]: Number,
};
