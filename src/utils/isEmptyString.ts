import { length } from 'utils/length';

const isEmptyString = (value: string) => value === '' || length(value) === 0

export { isEmptyString };
