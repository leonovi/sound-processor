const ARROW_RIGHT = 'ArrowRight';

const isArrowRight = (key: string): key is typeof ARROW_RIGHT => {
  return key === ARROW_RIGHT;
};

export { ARROW_RIGHT, isArrowRight };
