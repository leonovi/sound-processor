import { first } from './first';

export const sum = (...args: Array<number>) =>
  args.reduce((prev, curr) => prev + curr, 0);

export const subtract = (...args: Array<number>) =>
  args.slice(1).reduce((prev, curr) => prev - curr, first(args));

export const multiply = (...args: Array<number>) =>
  args.reduce((prev, curr) => prev * curr, 1);

export const divide = (...args: Array<number>) =>
  args.slice(1).reduce((prev, curr) => prev / curr, first(args));
