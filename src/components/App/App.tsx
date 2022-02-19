import React, { FC, useState } from 'react';

import { UserGestureHandler } from 'components/UserGestureHandler/UserGestureHandler';
import { AudioContextProvider } from 'components/AudioContextProvider/AudioContextProvider';
// import { Menu } from 'components/Menu/Menu';

import './App.css';

const App: FC = () => {
  const [wasThereUserGesture, setWasThereUserGesture] = useState(false);

  const content = wasThereUserGesture ? (
    <AudioContextProvider>Hello</AudioContextProvider>
  ) : (
    <UserGestureHandler onClick={() => setWasThereUserGesture(true)}>
      Please click!
    </UserGestureHandler>
  );

  return <div className="app">{content}</div>;
};

export { App };
