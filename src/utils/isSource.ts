import {
  Node,
  Source,
  SOURCE_PREFIX,
} from 'components/Flow/Flow.models';

const isSource = (node: Node<any>): node is Node<Source<any>> => {
  return node.type.startsWith(SOURCE_PREFIX);
};

export { isSource };
