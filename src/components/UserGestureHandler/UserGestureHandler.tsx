import React, { FC } from 'react';
import './UserGestureHandler.css';

type UserGestureHandlerPropsT = {
  onClick: () => void;
};

const UserGestureHandler: FC<UserGestureHandlerPropsT> = ({
  onClick,
  children,
}) => {
  return (
    <div className="user-gesture-handler" onClick={onClick}>
      {children}
    </div>
  );
};

export { UserGestureHandler };
