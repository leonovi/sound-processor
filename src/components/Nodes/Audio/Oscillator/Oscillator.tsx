import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import b_ from 'b_';
import './Oscillator.css';
import {
  createNotification,
  NotificationsTypes,
  useNotifications,
} from 'context/NotificationsContext';
import { Node } from 'components/Node/Node';
import { createNodeClass } from 'utils/createNodeClass';
import { EMPTY_STRING } from 'utils/constants';
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
  [NodeTypes.Sine]: <SineIcon />,
  [NodeTypes.Triangle]: <TriangleIcon />,
  [NodeTypes.Sawtooth]: <SawtoothIcon />,
  [NodeTypes.Square]: <SquareIcon />,
};

const getOscIcon = (
  type:
    | NodeTypes.Sine
    | NodeTypes.Triangle
    | NodeTypes.Sawtooth
    | NodeTypes.Square
) => OscIcons[type];

const ERROR_TYPE_SEPARATOR = ':';

const getErrorMessage = (error: Error) => {
  return String(error)
    .split(ERROR_TYPE_SEPARATOR)
    .slice(1)
    .join(EMPTY_STRING);
};

const b = b_.with('oscillator-node');

const Oscillator: FC<OscillatorNodeT> = ({
  type,
  data,
  className,
}) => {
  const notifications = useNotifications();

  const {
    inputs: { frequency, detune, partials, phase, volume },
    module,
  } = data.config;

  const executeOsc = () => {
    module.start();
    return () => {
      module.stop();
    };
  };

  const trySet = (
    value: number,
    setFunc: (value: number) => void
  ) => {
    try {
      setFunc(value);
    } catch (error) {
      if (error instanceof RangeError) {
        notifications.add(
          createNotification(
            NotificationsTypes.RangeError,
            getErrorMessage(error)
          )
        );
      }
    }
  };

  const setFrequency = (value: number) => {
    module.frequency.rampTo(value, RAMP_TIME);
  };
  const setDetune = (value: number) => {
    module.detune.rampTo(value, RAMP_TIME);
  };
  const setPartials = (value: number) => {
    module.partialCount = value;
  };
  const setPhase = (value: number) => {
    module.phase = value;
  };
  const setVolume = (value: number) => {
    module.volume.rampTo(value, RAMP_TIME);
  };

  useEffect(executeOsc, []);

  useConnection(frequency.id, (value) =>
    trySet(value, setFrequency)
  );
  useConnection(detune.id, (value) =>
    trySet(value, setDetune)
  );
  useConnection(partials.id, (value) =>
    trySet(value, setPartials)
  );
  useConnection(phase.id, (value) =>
    trySet(value, setPhase)
  );
  useConnection(volume.id, (value) =>
    trySet(value, setVolume)
  );

  return (
    <Node
      className={cn(b(), className)}
      {...data.config}
      name={getOscIcon(type)}
    />
  );
};

const Sine: FC<SineNodeT> = (props) => (
  <Oscillator
    className={createNodeClass(NodeTypes.Sine)}
    {...props}
  />
);

const Triangle: FC<TriangleNodeT> = (props) => (
  <Oscillator
    className={createNodeClass(NodeTypes.Triangle)}
    {...props}
  />
);

const Sawtooth: FC<SawtoothNodeT> = (props) => (
  <Oscillator
    className={createNodeClass(NodeTypes.Sawtooth)}
    {...props}
  />
);

const Square: FC<SquareNodeT> = (props) => (
  <Oscillator
    className={createNodeClass(NodeTypes.Square)}
    {...props}
  />
);

export { Sine, Triangle, Sawtooth, Square };
