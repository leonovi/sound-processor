import { createContext, Dispatch, useContext } from 'react';

export type AudioModulesT = Array<AudioNode | AudioWorkletNode>;

type AudioModulesContextT = {
  audioModules: AudioModulesT;
  setAudioModules: Dispatch<React.SetStateAction<AudioModulesT>>;
};

export const AudioModulesContext = createContext<AudioModulesContextT>(null!);

export const useAudioModulesContext = () => useContext(AudioModulesContext);
