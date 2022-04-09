const subtract = (...args: Array<number>) => {
  return args.reduce((prev, curr) => prev - curr, 0);
};

export { subtract };
