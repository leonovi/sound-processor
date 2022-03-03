import React, { FC } from 'react';

import b_ from 'b_';
import './VolumeWarning.css';

const b = b_.with('volume-warning');

const VolumeWarning: FC = () => (
  <span className={b()}>
    The app works with sound. Make sure your ears won't be affected by forceful
    audio signals. If you are ready to continue, just
    <span className={b('accent-word')}> click</span> anywhere to start.
  </span>
);

export { VolumeWarning };
