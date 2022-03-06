import { nanoid } from 'nanoid';
import { NodeData } from '../Nodes';

export type SourceData = NodeData & { value: number }

export const CONSTANT_SOURCE_OUTPUTS = [
  { id: `CONSTANT_SOURCE_OUTPUT-${nanoid()}`, label: 'Output' },
];
