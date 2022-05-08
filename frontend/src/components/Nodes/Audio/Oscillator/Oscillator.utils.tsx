import React from 'react';

import { NodeTypes } from 'components/Nodes/models';

import SineIcon from 'icons/sine-wave.svg';
import TriangleIcon from 'icons/triangle-wave.svg';
import SawtoothIcon from 'icons/sawtooth-wave.svg';
import SquareIcon from 'icons/square-wave.svg';

const OscIcons = {
  [NodeTypes.Sine]: <SineIcon />,
  [NodeTypes.Triangle]: <TriangleIcon />,
  [NodeTypes.Sawtooth]: <SawtoothIcon />,
  [NodeTypes.Square]: <SquareIcon />,
};

export const getOscIcon = (
  type:
    | NodeTypes.Sine
    | NodeTypes.Triangle
    | NodeTypes.Sawtooth
    | NodeTypes.Square
) => OscIcons[type];
