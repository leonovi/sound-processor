import React, { FC } from 'react';

import b_ from 'b_';
import './UserGestureHandler.css';

const b = b_.with('user-gesture-handler');

type UserGestureHandlerPropsT = {
  onClick: () => void;
};

const UserGestureHandler: FC<UserGestureHandlerPropsT> = ({
  onClick,
  children,
}) => (
  <div className={b()} onClick={onClick}>
    {children}
  </div>
);

export { UserGestureHandler };
