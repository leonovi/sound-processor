import React, { FC, useEffect, useRef } from 'react';
import { Node } from 'components/Node/Node';
import { flattenProps } from 'utils/flattenProps';

import { AnalyserNodeT } from './Analyser.models';
import { drawFrequencyData } from './Analyser.utils';

const CANVAS_2D_CONTEXT = '2d';
const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 64;
const DRAW_INTERVAL = 100;

const Analyser: FC<AnalyserNodeT> = (props) => {
  const { config, audioNode } =
    flattenProps<AnalyserNodeT>(props);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext(CANVAS_2D_CONTEXT);
    if (!canvas || !context) {
      return;
    }

    drawFrequencyData(
      context,
      audioNode.getValue() as Float32Array
    );
  };

  useEffect(() => {
    const intervalId = setInterval(draw, DRAW_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Node config={config}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </Node>
  );
};

export { Analyser };
