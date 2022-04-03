export enum NodeCategories {
  Math = 'Math',
  Utilities = 'Utilities',
}

export enum NodeTypes {
  Sum = 'Sum',
  Number = 'Number',
  Bang = 'Bang',
  Metro = 'Metro',
  Switch = 'Switch',
  Defer = 'Defer',
}

export enum TypeOfData {
  Any = 'any',
  Boolean = 'boolean',
  Number = 'number',
}

type GateT = {
  id: string;
  datatype: TypeOfData;
  hint: string;
  name?: string;
}
export type InputT = GateT;
export type OutputT = GateT;

export type PropsDataT = {
  name: NodeTypes;
  category: NodeCategories;
  inputs: Record<string, InputT>;
  outputs: Record<string, OutputT>;
}
