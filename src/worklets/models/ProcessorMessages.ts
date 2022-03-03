const ProcessorsMessages = {
  STOP: 'module/STOP',
  NOISE: {
    CHANGE_TYPE: 'noise/CHANGE_TYPE',
  },
  OSCILLATOR: {
    CHANGE_TYPE: 'oscillator/CHANGE_TYPE',
  },
} as const;

const stopModuleMessage = () => ({
  type: ProcessorsMessages.STOP,
})

export { ProcessorsMessages, stopModuleMessage }
