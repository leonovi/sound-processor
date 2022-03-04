export type InputControllerProps = {
  value: number;
  minValue: number;
  maxValue: number;
  step?: number;
  onChange: (value: number) => void;
};

export const DEFAULT_STEP = 1;
