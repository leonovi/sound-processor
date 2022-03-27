import { getOutgoers } from "react-flow-renderer"
import { isNode } from "utils/isNode";
import { isUndefined } from "utils/isUndefined";
import { useElements } from "./useElements";

const useOutgoers = (id: string) => {
  const elements = useElements();
  const element = elements.find((node) => node.id === id)

  if (isUndefined(element) || !isNode(element)) {
    throw new Error('');
  }

  return getOutgoers(element, elements);
}

export { useOutgoers };
