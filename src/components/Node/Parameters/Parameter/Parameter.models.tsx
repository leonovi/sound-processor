import { ReactNode } from 'react';

export type ParameterOptions = {
  controller: ReactNode;
  label?: string;
};

export type ParameterProps = ParameterOptions & {};

export const NO_LABEL = ' ';
