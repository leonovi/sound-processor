import { NodeCategories, TypeOfData } from "components/Nodes/models";
import { ReactNode } from "react";

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
  name: ReactNode;
  category: NodeCategories;
  inputs?: Record<string, InputT>;
  outputs?: Record<string, OutputT>;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};
