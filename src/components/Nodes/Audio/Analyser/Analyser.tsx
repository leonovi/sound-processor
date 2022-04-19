import React, { FC, useEffect, useRef } from 'react';
import { Node } from 'components/Node/Node';
import { AnalyserNodeT } from './Analyser.models';
import { Colors } from 'style-guide/colors';
import { useAnimationFrame } from 'hooks/useAnimationFrame';

const transposeData = (data: number) => (data + 1) / 2;

function drawTimeDomainData(context: CanvasRenderingContext2D, data: Float32Array) {
  let x = 0;
  const height = context.canvas.height;
  const width = context.canvas.width;
  const bufferLength = data.length;
  const sliceWidth = width / bufferLength;

  context.fillStyle = Colors.White;
  context.fillRect(0, 0, width, height);

  context.lineWidth = 2;
  context.strokeStyle = Colors.Blue;
  context.beginPath();
  context.moveTo(x, (height - data[0]) / 1);
  for (let i = 1; i < bufferLength; i++) {
    const y = data[i];
    context.lineTo(x, (height - y) / 2);
    x += sliceWidth;
  }
  context.stroke();
}

function drawFrequencyData(
  context: CanvasRenderingContext2D,
  data: Float32Array
) {
  let xPosition = 0;
  let yPosition = 0;

  const height = context.canvas.height;
  const width = context.canvas.width;

  const bufferLength = data.length;

  const rectWidth = width / bufferLength;
  const rectHeight = 2;

  context.fillStyle = Colors.White;
  context.fillRect(0, 0, width, height);

  context.fillStyle = Colors.Blue;
  for (let i = 0; i < bufferLength; i++) {
    yPosition = height - height * transposeData(data[i] * 0.8);

    context.fillRect(xPosition, yPosition, rectWidth, rectHeight);

    xPosition += rectWidth;
  }
}

const Analyser: FC<AnalyserNodeT> = ({ id, data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { module } = data.config;

  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      return;
    }
    drawTimeDomainData(context, module.getValue() as Float32Array)
    // drawFrequencyData(context, module.getValue() as Float32Array);
  };

  // useAnimationFrame(draw);
  useEffect(() => {
    const intervalId = setInterval(draw, 16);
    return () => clearInterval(intervalId);
  })

  return (
    <Node {...data.config}>
      <canvas ref={canvasRef} width={200} height={64} />
    </Node>
  );
};

export { Analyser };
