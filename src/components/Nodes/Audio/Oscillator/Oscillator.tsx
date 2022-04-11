import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import b_ from 'b_';
import './Oscillator.css';
import { Node } from 'components/Node/Node';
import { createNodeClass } from 'utils/createNodeClass';
import {
  OscillatorNodeT,
  SawtoothNodeT,
  SineNodeT,
  SquareNodeT,
  TriangleNodeT,
} from './Oscillator.models';
import { NodeTypes } from 'components/Nodes/models';

const b = b_.with('oscillator-node');

const Oscillator: FC<OscillatorNodeT> = ({ id, data, className }) => {
  const { module } = data.config;

  const startModule = () => {
    module.start();
  };
  const stopModule = () => {
    module.stop();
  };

  useEffect(() => {
    startModule();
    return () => stopModule();
  }, []);

  return <Node className={cn(b(), className)} {...data.config}></Node>;
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
