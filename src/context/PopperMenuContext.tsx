import { createContext, ReactElement, useContext } from 'react';

export type BoundingBoxT = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

export type PopperMenuContextT = {
  setRect: (boundingBox: BoundingBoxT) => void;
  getRect: () => BoundingBoxT;
  show: (reactElement: ReactElement) => void;
  hide: () => void;
};

export const PopperMenuContext = createContext<PopperMenuContextT>(null!);

export const usePopperMenuContext = () => useContext(PopperMenuContext);
