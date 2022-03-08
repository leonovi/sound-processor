import { nanoid } from 'nanoid';

const createOutputId = (name: string) => {
  return `${name.toUpperCase()}_OUTPUT-${nanoid()}`;
};

export { createOutputId };
