import { Node } from 'react-flow-renderer';

export type NodeT<T> = Omit<Node<T>, 'type'> & {
  type: NodeTypes;
};

export enum NodeTypes {
  BLANK = 'BLANK',
}
