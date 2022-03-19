const isNumber = (value: any): value is number => {
  return typeof value === 'number' || value.match(/^\d+$/);
}

export { isNumber };
