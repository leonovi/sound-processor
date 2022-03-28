import { NodeTypes } from 'components/Nodes/propsData';
import { useMemo } from 'react';
import { NodeT } from 'utils/isNode';

const useBang = (incomers: Array<NodeT<any>>) => {
  return useMemo(
    () => incomers.find(({ type }) => type === NodeTypes.Bang),
    [incomers]
  );
};

export { useBang };
