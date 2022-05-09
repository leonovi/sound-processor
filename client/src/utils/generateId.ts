import { nanoid } from 'nanoid';

const generateId = (...args: Array<string>) => [...args, nanoid()].join('_');

export { generateId };
