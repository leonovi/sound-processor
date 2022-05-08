import { TypeOfData } from 'components/Nodes/models';

export enum HandleModes {
  Input = 'input',
  Output = 'output',
}

export enum HandleTypes {
  Source = 'source',
  Target = 'target',
}

export type HandleT = {
  id: string;
  dataType: TypeOfData;
  hint: string;
  name?: string;
};

export type HandlePropsT = HandleT & {
  mode: HandleModes;
};
