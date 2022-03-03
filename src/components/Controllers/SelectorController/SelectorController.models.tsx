import { ReactNode } from 'react';

export type SelectorControllerOption = {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
};

export type SelectorControllerProps = {
  options: Array<SelectorControllerOption>;
};

export const DEFAULT_SELECTOR_OPTION: SelectorControllerOption = {
  selected: false,
  onClick: () => {},
  children: 'None',
};
