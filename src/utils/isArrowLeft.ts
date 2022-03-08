const ARROW_LEFT = 'ArrowLeft';

const isArrowLeft = (key: string): key is typeof ARROW_LEFT => {
  return key === ARROW_LEFT;
};

export { ARROW_LEFT, isArrowLeft };
