import { Node as FlowNode } from 'react-flow-renderer';

export enum NodeCategories {
  Math = 'Math',
  Utilities = 'Utilities',
  Audio = 'Audio',
}

export enum NodeTypes {
  // Math
  Sum = 'Sum',
  Subtract = 'Subtract',
  Multiply = 'Multiply',
  Divide = 'Divide',
  Number = 'Number',
  // Utilities
  Bang = 'Bang',
  Metro = 'Metro',
  Switch = 'Switch',
  Defer = 'Defer',
  // Audio
  Sine = 'Sine',
  Triangle = 'Triangle',
  Sawtooth = 'Sawtooth',
  Square = 'Square',
  Destination = 'Destination',
}

export enum TypeOfData {
  Any = 'any',
  Boolean = 'boolean',
  Number = 'number',
  Audio = 'audio',
}

type NodeParametersT = {
  type: NodeTypes;
  data: any;
};

export type FlowNodeT<T extends NodeParametersT = NodeParametersT> = Overwrite<
  FlowNode,
  {
    type: T['type'];
    data: T['data'];
  }
>;
