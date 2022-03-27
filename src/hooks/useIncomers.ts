import { getIncomers } from 'react-flow-renderer';
import { isNode, NodeT } from 'utils/isNode';
import { isUndefined } from 'utils/isUndefined';
import { useElements } from './useElements';

const useIncomers = (id: string) => {
  const elements = useElements();
  const element = elements.find((node) => node.id === id);

  if (isUndefined(element) || !isNode(element)) {
    throw new Error('');
  }

  return getIncomers(element, elements) as Array<NodeT<any>>;
};

export { useIncomers };
