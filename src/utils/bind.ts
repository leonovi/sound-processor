const bind = (fn: (...args: any) => any, ...args: Array<any>) => {
  return fn.bind(null, ...args);
}

export { bind };
