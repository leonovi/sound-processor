import { EMPTY_STRING } from './constants';

const ERROR_TYPE_SEPARATOR = ':';

export const extractErrorMessage = (error: Error) => {
  return String(error)
    .split(ERROR_TYPE_SEPARATOR)
    .slice(1)
    .join(EMPTY_STRING);
};
