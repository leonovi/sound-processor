import { nanoid } from 'nanoid';

const createInputId = (name: string) => {
  return `${name.toUpperCase()}_INPUT-${nanoid()}`;
};

export { createInputId };
