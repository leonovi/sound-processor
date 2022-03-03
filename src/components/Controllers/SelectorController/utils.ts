import { first } from 'utils/first';
import { SelectorControllerOption } from './SelectorController.models';

const findSelectedOption = (options: Array<SelectorControllerOption>) => {
  return first(options.filter(({ selected }) => selected));
};

export { findSelectedOption };
