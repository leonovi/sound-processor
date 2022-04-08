const sum = (...args: Array<number>) => {
  return args.reduce((prev, curr) => prev + curr, 0);
};

export { sum };
