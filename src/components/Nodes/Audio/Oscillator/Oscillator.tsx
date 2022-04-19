import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import b_ from 'b_';
import './Oscillator.css';
import { Node } from 'components/Node/Node';
import { createNodeClass } from 'utils/createNodeClass';
import { useConnection } from 'hooks/useConnection';
import {
  OscillatorNodeT,
  SawtoothNodeT,
  SineNodeT,
  SquareNodeT,
  TriangleNodeT,
} from './Oscillator.models';
import { NodeTypes } from 'components/Nodes/models';

import SineIcon from 'icons/sine-wave.svg';
import TriangleIcon from 'icons/triangle-wave.svg';
import SawtoothIcon from 'icons/sawtooth-wave.svg';
import SquareIcon from 'icons/square-wave.svg';

const RAMP_TIME = 0.2;

const OscIcons = {
  [NodeTypes.Sine]: SineIcon,
  [NodeTypes.Triangle]: TriangleIcon,
  [NodeTypes.Sawtooth]: SawtoothIcon,
  [NodeTypes.Square]: SquareIcon,
};

const b = b_.with('oscillator-node');

const Oscillator: FC<OscillatorNodeT> = ({ id, type, data, className }) => {
  const {
    inputs: {
      oscillatorFrequencyInput,
      oscillatorDetuneInput,
      oscillatorPartialsInput,
      oscillatorPhaseInput,
      oscillatorVolumeInput,
    },
    module,
  } = data.config;

  const executeOsc = () => {
    module.start();
    return () => {
      module.stop();
    };
  };
  useEffect(executeOsc, []);

  useConnection(oscillatorFrequencyInput.id, (value) =>
    module.frequency.rampTo(value, RAMP_TIME)
  );

  useConnection(oscillatorDetuneInput.id, (value) =>
    module.detune.rampTo(value, RAMP_TIME)
  );

  useConnection(
    oscillatorPartialsInput.id,
    (value) => (module.partialCount = value)
  );

  useConnection(oscillatorPhaseInput.id, (value) => (module.phase = value));

  useConnection(oscillatorVolumeInput.id, (value) =>
    module.volume.rampTo(value, RAMP_TIME)
  );

  const OscIcon = OscIcons[type];
  return (
    <Node
      className={cn(b(), className)}
      {...data.config}
      name={<OscIcon className={b('icon')} />}
    />
  );
};

const Sine: FC<SineNodeT> = (props) => (
  <Oscillator className={createNodeClass(NodeTypes.Sine)} {...props} />
);

const Triangle: FC<TriangleNodeT> = (props) => (
  <Oscillator className={createNodeClass(NodeTypes.Triangle)} {...props} />
);

const Sawtooth: FC<SawtoothNodeT> = (props) => (
  <Oscillator className={createNodeClass(NodeTypes.Sawtooth)} {...props} />
);

const Square: FC<SquareNodeT> = (props) => (
  <Oscillator className={createNodeClass(NodeTypes.Square)} {...props} />
);

export { Sine, Triangle, Sawtooth, Square };
