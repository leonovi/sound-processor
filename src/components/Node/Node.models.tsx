import { PropsDataT } from "components/Nodes/models";

export enum HandleTypes {
  Source = 'source',
  Target = 'target',
}

export type NodePropsT = {
  name?: PropsDataT['name'] | string;
  compact?: true;
  inputs?: PropsDataT['inputs'];
  outputs?: PropsDataT['outputs'];
  className?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};
