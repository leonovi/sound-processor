import { NodeCategories, TypeOfData } from "components/Nodes/models";

export enum HandleTypes {
  Source = 'source',
  Target = 'target',
}

type InOutT = {
  id: string;
  dataType: TypeOfData;
  hint: string;
  name?: string;
}

export type InputT = InOutT;
export type OutputT = InOutT;

export type NodePropsT = {
  compact?: true;
  className?: string;
  name: string;
  category: NodeCategories;
  inputs?: Record<string, InputT>;
  outputs?: Record<string, OutputT>;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};
