import React, { FC, useEffect } from 'react';
import { isNumber } from 'tone';
import cn from 'classnames';
import b_ from 'b_';
import './Oscillator.css';
import { Node } from 'components/Node/Node';
import { NodeTypes } from 'components/Nodes/models';
import {
  OscillatorNodeT,
  SawtoothNodeT,
  SineNodeT,
  SquareNodeT,
  TriangleNodeT,
} from './Oscillator.models';
import { getOscIcon } from './Oscillator.utils';

import { createNodeClass } from 'utils/createNodeClass';
import { RAMP_TIME } from 'utils/constants';
import { flattenProps } from 'utils/flattenProps';
import { useConnections } from 'store/connections';

const b = b_.with('oscillator-node');

const Oscillator: FC<OscillatorNodeT> = ({
  className,
  ...props
}) => {
  const {
    type,
    methods,
    config,
    audioNode,
    inputs: { frequency, detune, partialCount, phase, volume },
  } = flattenProps<OscillatorNodeT>(props);

  useEffect(methods.executeAudioNode(audioNode), []);

  const { getSourceValue } = useConnections();

  const incFreq = getSourceValue(frequency.id);
  useEffect(() => {
    methods.setParam(audioNode.frequency, (param) => {
      param.rampTo(
        //@ts-ignore
        isNumber(incFreq) ? incFreq : param.defaultValue,
        RAMP_TIME
      );
    });
  }, [incFreq]);

  const incDetune = getSourceValue(detune.id);
  useEffect(() => {
    methods.setParam(audioNode.detune, (param) => {
      param.rampTo(
        isNumber(incDetune)
          ? incDetune
          //@ts-ignore
          : param.defaultValue,
        RAMP_TIME
      );
    });
  }, [incDetune]);

  const incPartialCount = getSourceValue(partialCount.id);
  useEffect(() => {
    audioNode.partialCount = isNumber(incPartialCount)
      ? incPartialCount
      : audioNode.partialCount;
  }, [incPartialCount]);

  const incPhase = getSourceValue(phase.id);
  useEffect(() => {
    audioNode.phase = isNumber(incPhase)
      ? incPhase
      : audioNode.phase;
  }, [incPhase]);

  const incVolume = getSourceValue(volume.id);
  useEffect(() => {
    methods.setParam(audioNode.volume, (param) => {
      param.rampTo(
        isNumber(incVolume)
          ? incVolume
          //@ts-ignore
          : param.defaultValue,
        RAMP_TIME
      );
    });
  }, [incVolume]);

  return (
    <Node
      className={cn(b(), className)}
      config={{
        ...config,
        name: getOscIcon(type),
      }}
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
