const SEPARATOR = '';

const stringCapitalize = (string: string): string => {
  return string
    .split(SEPARATOR)
    .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
    .join(SEPARATOR);
};

export { stringCapitalize };
