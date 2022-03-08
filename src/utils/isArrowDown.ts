const ARROW_DOWN = 'ArrowDown';

const isArrowDown = (key: string): key is typeof ARROW_DOWN => {
  return key === ARROW_DOWN;
};

export { ARROW_DOWN, isArrowDown };
