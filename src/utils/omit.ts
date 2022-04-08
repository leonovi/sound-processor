const omit = <T extends {}, K extends keyof T>(
  object: T,
  property: K
): Omit<T, K> => {
  return Object.fromEntries([
    Object.entries(object).filter(([key]) => key !== property),
  ]) as Omit<T, K>;
};

export { omit };
