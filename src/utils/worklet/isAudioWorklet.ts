const isAudioWorklet = (
  module: AudioNode | null | undefined
): module is AudioWorkletNode => {
  return module instanceof AudioWorkletNode;
};

export { isAudioWorklet };
