import React, { FC, useState } from 'react';

import { UserGestureHandler } from 'components/UserGestureHandler/UserGestureHandler';
import { AudioContext } from 'components/AudioContext/AudioContext';
import { VolumeWarning } from 'components/VolumeWarning/VolumeWarning';
import { Flow } from 'components/Flow/Flow';

const App: FC = () => {
  const [wasThereUserGesture, setWasThereUserGesture] = useState(false);

  const content = wasThereUserGesture ? (
    <AudioContext>
      <Flow />
    </AudioContext>
  ) : (
    <UserGestureHandler onClick={() => setWasThereUserGesture(true)}>
      <VolumeWarning />
    </UserGestureHandler>
  );

  return <React.Fragment>{content}</React.Fragment>;
};

export { App };
