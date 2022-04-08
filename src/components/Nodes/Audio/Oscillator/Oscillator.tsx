import React, { FC } from 'react';
import b_ from 'b_';
import './Oscillator.css';

import { Node } from 'components/Node/Node';
import { OscillatorNodeT } from './Oscillator.models';

const b = b_.with('oscillator-node');

const Oscillator: FC<OscillatorNodeT> = ({ id, data }) => {
  const { module } = data.config;

  return (
    <Node className={b()} {...data.config}>
      <input
        type="range"
        min={10}
        max={800}
        onChange={(event) => {
          module.frequency.rampTo(event.target.value, 0.2);
        }}
      />
      <button onClick={() => module.start()}>Start</button>
      <button onClick={() => module.stop()}>Stop</button>
    </Node>
  );
};

export { Oscillator };
