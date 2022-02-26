const isAudioWorklet = (node: AudioNode | null | undefined): node is AudioWorkletNode => {
  return node instanceof AudioWorkletNode;
};

export { isAudioWorklet };
