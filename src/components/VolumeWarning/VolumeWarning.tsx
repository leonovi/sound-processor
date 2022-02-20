import React, { FC } from 'react';
import './VolumeWarning.css';

const VolumeWarning: FC = () => {
  return (
    <span className="volume-warning">
      The app works with sound. Make sure your ears won't be affected by
      forceful audio signals. If you are ready to continue, just
      <span className="volume-warning__accent-word"> click</span> anywhere to
      start.
    </span>
  );
};

export { VolumeWarning };
