import React, { FC, Fragment, useState } from 'react';
import { ReactFlowProvider as ReactFlowContext } from 'react-flow-renderer';

import { UserGestureHandler } from 'components/UserGestureHandler/UserGestureHandler';
import { VolumeWarning } from 'components/VolumeWarning/VolumeWarning';
import { PopperMenuContext } from 'components/PopperMenuContext/PopperMenuContext';
import { NotificationsManager } from 'components/NotificationsManager/NotificationsManager';
import { Flow } from 'components/Flow/Flow';

const App: FC = () => {
  const [wasThereUserGesture, setWasThereUserGesture] =
    useState(false);

  if (!wasThereUserGesture) {
    return (
      <UserGestureHandler
        onClick={() => setWasThereUserGesture(true)}
      >
        <VolumeWarning />
      </UserGestureHandler>
    );
  }

  return (
    <Fragment>
      <PopperMenuContext>
        <ReactFlowContext>
          <Flow />
        </ReactFlowContext>
      </PopperMenuContext>
      <NotificationsManager />
    </Fragment>
  );
};

export { App };
