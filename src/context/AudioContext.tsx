import { createContext, useContext } from 'react';

export const AudioContext = createContext<AudioContext>(null!);

export const useAudioContext = () => useContext(AudioContext);
