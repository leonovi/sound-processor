import { Colors } from 'style-guide/colors';

export const drawFrequencyData = (
  context: CanvasRenderingContext2D,
  data: Float32Array
) => {
  const width = context.canvas.width;
  const height = context.canvas.height;

  context.strokeStyle = Colors.Blue;
  context.lineWidth = 1;

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
  context.stroke();
};
