import { NodeTypes } from 'components/Nodes/models';
import { propsData } from 'data/propsData';
import { useMemo } from 'react';

const useProps = <T extends NodeTypes>(type: T) => {
  return useMemo(() => {
    return propsData[type];
  }, []);
};

export { useProps };
