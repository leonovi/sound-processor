import { createContext } from 'react';
import { AudioContextT } from 'models/audioContext';

export const AudioContext = createContext<AudioContextT>(null);
