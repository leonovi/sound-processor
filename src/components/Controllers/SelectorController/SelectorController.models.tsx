import { ReactNode } from 'react';

export type SelectorControllerOption<T> = {
  value: T;
  children: ReactNode;
};

export type SelectorControllerProps<T> = {
  options: Array<SelectorControllerOption<T>>;
  selectedValue: T;
  onChange: (value: T) => void;
};
