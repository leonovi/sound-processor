export type InputControllerProps = {
  value?: number;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  module: AudioNode | null;
  controlledParameter: any;
};
