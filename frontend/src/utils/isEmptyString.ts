import { length } from 'utils/length';
import { EMPTY_STRING } from 'utils/constants';

const isEmptyString = (value: string) =>
  value === EMPTY_STRING || length(value) === 0;

export { isEmptyString };
