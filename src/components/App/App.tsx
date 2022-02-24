import React, { FC, useState } from 'react';

import { UserGestureHandler } from 'components/UserGestureHandler/UserGestureHandler';
import { AudioContext } from 'components/AudioContext/AudioContext';
import { VolumeWarning } from 'components/VolumeWarning/VolumeWarning';
import { Project } from 'components/Project/Project';
import { PopperMenuContext } from 'components/PopperMenuContext/PopperMenuContext';

const App: FC = () => {
  const [wasThereUserGesture, setWasThereUserGesture] = useState(false);

  if (!wasThereUserGesture) {
    return (
      <UserGestureHandler onClick={() => setWasThereUserGesture(true)}>
        <VolumeWarning />
      </UserGestureHandler>
    );
  }

  return (
    <AudioContext>
      <PopperMenuContext>
        <Project />
      </PopperMenuContext>
    </AudioContext>
  );
};

export { App };
