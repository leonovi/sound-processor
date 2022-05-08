export const capitalize = (string: string) =>
  string
    .split('')
    .map((sym, index) => (index === 0 ? sym.toUpperCase() : sym))
    .join('');
