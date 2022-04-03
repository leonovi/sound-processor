interface AudioWorkletProcessor {
  readonly port: MessagePort;
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ): void;
}

interface AudioParamDescriptor {
  automationRate?: AutomationRate;
  defaultValue?: number;
  maxValue?: number;
  minValue?: number;
  name: string;
}
interface AudioParamMap {
  forEach(callbackfn: (value: AudioParam, key: string, parent: AudioParamMap) => void, thisArg?: any): void;
  get(key: any): any | undefined;
}

declare var AudioWorkletProcessor: {
  prototype: AudioWorkletProcessor;
  new (options?: AudioWorkletNodeOptions): AudioWorkletProcessor;
};

declare function registerProcessor(
  name: string,
  processorCtor: (new (
    options?: AudioWorkletNodeOptions
  ) => AudioWorkletProcessor) & {
    parameterDescriptors?: AudioParamDescriptor[];
  }
): undefined;

declare var AudioParamMap: {
  prototype: AudioParamMap;
  new(): AudioParamMap;
};
