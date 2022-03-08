import { NodeTypes, Node } from 'components/Flow/Flow.models';
import { OSC_PARAMETERS } from 'worklets/OscillatorProcessor/OscillatorProcessor.models';

const buildParameters = (
  type: Node<any>['type']
): any /* TODO TYPE */ => {
  switch (type) {
    case NodeTypes.NOISE: {
    }

    case NodeTypes.OSCILLATOR: {
      return OSC_PARAMETERS;
    }

    case NodeTypes.DESTINATION: {
    }

    case NodeTypes.GAIN: {
    }

    default: {
      return null;
    }
  }
};

export { buildParameters };
