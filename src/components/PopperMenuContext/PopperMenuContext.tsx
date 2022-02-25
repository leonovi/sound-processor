import React, { FC, ReactElement, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { VirtualElement } from '@popperjs/core';

import {
  PopperMenuContext,
  PopperMenuContextT,
} from 'context/PopperMenuContext';

import { isNull } from 'utils/isNull';

type PopperVirtualReferenceT = VirtualElement | null;
type PopperElementT = ReactElement | null;
type PopperRefT = HTMLDivElement | null;

const DEFAULT_BOUNDING_BOX = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
};

const PopperMenuContextProvider: FC = ({ children }) => {
  const virtualReference = useRef<PopperVirtualReferenceT>(null);

  const [popperElement, setPopperElement] = useState<PopperElementT>(null);
  const [popperRef, setPopperRef] = useState<PopperRefT>(null);

  const setPopperRefWrapper = (htmlNode: PopperRefT) => {
    !isNull(htmlNode) && setPopperRef(htmlNode);
  };

  const popperObject = usePopper(virtualReference.current, popperRef);
  const popperStyles = popperObject.styles.popper;
  const popperAttributes = popperObject.attributes.popper;

  const popperMenuContext = useMemo(
    (): PopperMenuContextT => ({
      setRect: (boundingBox) => {
        virtualReference.current = {
          getBoundingClientRect: () => boundingBox as DOMRect,
        };
      },
      getRect: () => {
        return isNull(virtualReference.current)
          ? DEFAULT_BOUNDING_BOX
          : virtualReference.current.getBoundingClientRect();
      },
      show: (reactElement: ReactElement) => {
        setPopperElement(reactElement);
      },
      hide: () => {
        setPopperElement(null);
      },
    }),
    []
  );

  return (
    <PopperMenuContext.Provider value={popperMenuContext}>
      {children}
      <div ref={setPopperRefWrapper} style={popperStyles} {...popperAttributes}>
        {popperElement}
      </div>
    </PopperMenuContext.Provider>
  );
};

export { PopperMenuContextProvider as PopperMenuContext };
