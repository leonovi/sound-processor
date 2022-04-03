const find = <T>(elements: Array<T>, predicate: (element: T) => boolean) => {
  return elements.find(predicate);
}

export { find };
