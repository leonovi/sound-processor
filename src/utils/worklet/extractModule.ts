import { NodeData } from 'components/Nodes/Nodes';

const extractModule = (data: NodeData): AudioNode | null => data.module;

export { extractModule };
