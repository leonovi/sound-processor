import React, { FC, useEffect, useRef } from 'react';
import { Node } from 'components/Node/Node';
import { AnalyserNodeT } from './Analyser.models';
import { Colors } from 'style-guide/colors';

const DRAW_INTERVAL = 333;
const CONTEXT_2D = '2d';

function drawFrequencyData(
  context: CanvasRenderingContext2D,
  data: Float32Array
) {
  const width = context.canvas.width;
  const height = context.canvas.height;
  context.clearRect(0, 0, width, height);
  context.beginPath();
  for (let i = 0; i < data.length; i++) {
    const x = i;
    const y = (0.5 + (data[i] * 0.8) / 2) * height;

    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
  context.strokeStyle = Colors.Blue;
  context.lineWidth = 1;
  context.stroke();
}

const Analyser: FC<AnalyserNodeT> = ({ id, data }) => {
  const { module } = data.config;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext(CONTEXT_2D);
    if (!canvas || !context) {
      return;
    }

    drawFrequencyData(
      context,
      module.getValue() as Float32Array
    );
  };

  useEffect(() => {
    const intervalId = setInterval(draw, DRAW_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Node {...data.config}>
      <canvas ref={canvasRef} width={200} height={64} />
    </Node>
  );
};

export { Analyser };
