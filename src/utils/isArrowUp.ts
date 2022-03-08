const ARROW_UP = 'ArrowUp';

const isArrowUp = (key: string): key is typeof ARROW_UP => {
  return key === ARROW_UP;
};

export { ARROW_UP, isArrowUp };
