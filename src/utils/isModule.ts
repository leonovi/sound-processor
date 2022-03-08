import {
  Node,
  Module,
  MODULE_PREFIX,
} from 'components/Flow/Flow.models';

const isModule = (node: Node<any>): node is Node<Module> => {
  return node.type.startsWith(MODULE_PREFIX);
};

export { isModule };
