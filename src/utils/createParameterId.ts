import { nanoid } from 'nanoid';

const createParameterId = (node: string, parameter: string) => {
  return `${node.toUpperCase()}_${parameter.toUpperCase()}_PARMETER-${nanoid()}`;
};

export { createParameterId };
