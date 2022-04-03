const filter = <T>(elements: Array<T>, cb: (element: T) => boolean) =>
  elements.filter(cb);

export { filter };
