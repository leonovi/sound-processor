import { Dispatch, SetStateAction, useEffect } from 'react';
import { Node } from 'react-flow-renderer';

const extractValue = (node: Node | undefined) => node?.data?.value;

const useSetters = (
  inputs: Map<string | null | undefined, Node | undefined>,
  setters: Map<string, Dispatch<SetStateAction<number>>>
) => {
  useEffect(() => {
    inputs.forEach((node, inputId) => {
      const value = extractValue(node);

      if (value && inputId) {
        const setter = setters.get(inputId);
        setter && setter(value);
      }
    });
  }, [inputs]);
};

export { useSetters };
