export enum HandleTypes {
  Source = 'source',
  Target = 'target',
}

export type IODataT = {
  id: string;
  hint?: string;
};

export type NodePropsT = {
  name?: string;
  withoutHeader?: true;
  color?: string;
  className?: string;
  inputs?: Array<IODataT>;
  outputs?: Array<IODataT>;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};
