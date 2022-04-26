import React, {
  FC,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  OnLoadFunc,
  removeElements,
  Elements,
} from 'react-flow-renderer';
import { usePopperMenuContext } from 'context/PopperMenuContext';
import {
  createNotification,
  NotificationsTypes,
  useNotifications,
} from 'context/NotificationsContext';
import { EMPTY_STRING } from 'utils/constants';
import { generateId } from 'utils/generateId';
import { isNode } from 'utils/isNode';
import { isEdge } from 'utils/isEdge';
import { checkConnection } from 'utils/checkConnection';
import { ContextMenu } from 'components/ContextMenu/ContextMenu';
import {
  NodeCategories,
  NodeTypes,
} from 'components/Nodes/models';
import { configs } from 'data/configs';

import {
  Divide,
  Multiply,
  Subtract,
  Sum,
} from 'components/Nodes/Math/MathOperation/MathOperation';
import { Number } from 'components/Nodes/Math/Number/Number';
import { Bang } from 'components/Nodes/Utilities/Bang/Bang';
import { Metro } from 'components/Nodes/Utilities/Metro/Metro';
import { Switch } from 'components/Nodes/Utilities/Switch/Switch';
import { Defer } from 'components/Nodes/Utilities/Defer/Defer';
import {
  Sawtooth,
  Sine,
  Square,
  Triangle,
} from 'components/Nodes/Audio/Oscillator/Oscillator';
import { Destination } from 'components/Nodes/Audio/Destination/Destination';
import { Analyser } from 'components/Nodes/Audio/Analyser/Analyser';
import { Noise } from 'components/Nodes/Audio/Noise/Noise';
import { BiquadFilter } from 'components/Nodes/Audio/BiquadFilter/BiquadFilter';

const BACKSPACE_KEYCODE = 8;

const EDGE_TYPES = {}; // TODO create custom edge

const NODE_TYPES: Record<NodeTypes, ReactNode> = {
  // Math
  [NodeTypes.Sum]: Sum,
  [NodeTypes.Subtract]: Subtract,
  [NodeTypes.Multiply]: Multiply,
  [NodeTypes.Divide]: Divide,
  [NodeTypes.Number]: Number,
  // Utilities
  [NodeTypes.Bang]: Bang,
  [NodeTypes.Metro]: Metro,
  [NodeTypes.Switch]: Switch,
  [NodeTypes.Defer]: Defer,
  // Audio
  [NodeTypes.Sine]: Sine,
  [NodeTypes.Triangle]: Triangle,
  [NodeTypes.Sawtooth]: Sawtooth,
  [NodeTypes.Square]: Square,
  [NodeTypes.Destination]: Destination,
  [NodeTypes.Analyser]: Analyser,
  [NodeTypes.Noise]: Noise,
  [NodeTypes.BiquadFilter]: BiquadFilter,
};

const findModules = (
  elements: Elements,
  source: string | null,
  target: string | null
): {
  sourceModule: AudioNode | null | undefined;
  targetModule: AudioNode | null | undefined;
} => {
  const sourceNode = elements
    .filter(isNode)
    .find((element) => element.id === source);

  const targetNode = elements
    .filter(isNode)
    .find((element) => element.id === target);

  const sourceModule = sourceNode?.data?.config?.module;
  const targetModule = targetNode?.data?.config?.module;

  return { sourceModule, targetModule };
};

const Flow: FC = () => {
  const popperMenuContext = usePopperMenuContext();
  const notifications = useNotifications();

  const [elements, setElements] = useState<Elements>([]);

  const connectModules = (
    source: string | null,
    target: string | null
  ): void => {
    const { sourceModule, targetModule } = findModules(
      elements,
      source,
      target
    );

    if (sourceModule && targetModule) {
      sourceModule.connect(targetModule);
    }
  };

  const disconnectModules = (
    source: string | null,
    target: string | null
  ): void => {
    const { sourceModule, targetModule } = findModules(
      elements,
      source,
      target
    );

    if (sourceModule && targetModule) {
      sourceModule.disconnect(targetModule);
    }
  };

  const onElementsRemove = (
    elementsToRemove: Elements
  ): void => {
    const edgesToRemove = elementsToRemove.filter(isEdge);

    edgesToRemove.forEach(({ source, target }) =>
      disconnectModules(source, target)
    );

    setElements((elements) =>
      removeElements(elementsToRemove, elements)
    );
  };

  const onConnect = (
    connectionParams: Edge | Connection
  ): void => {
    const { source, target, sourceHandle, targetHandle } =
      connectionParams;

    const { isValid, sourceDataType, targetDataType } =
      checkConnection(
        sourceHandle ?? EMPTY_STRING,
        targetHandle ?? EMPTY_STRING
      );

    if (!isValid) {
      notifications.add(
        createNotification(
          NotificationsTypes.InvalidConnection,
          `Type ${sourceDataType} does not match type ${targetDataType}`
        )
      );
      return;
    }

    // if (
    //   source?.startsWith(NodeCategories.Audio) &&
    //   target?.startsWith(NodeCategories.Audio)
    // ) {
    //   console.log('AUDIO NODES CONNECTION');
    // }

    // if (
    //   sourceHandle?.match(AUDIO_HANDLE_IDENTITY) &&
    //   targetHandle?.match(AUDIO_HANDLE_IDENTITY)
    // ) {
    //   console.log('AUDIO HANDLE CONNECTION');
    // }

    connectModules(source, target);
    setElements((elements) =>
      addEdge(connectionParams, elements)
    );
  };

  // const patchNode = (node: Node<any>): Node<any> => ({
  //   ...node,
  //   data: {
  //     //
  //   },
  // });

  // const patchEdge = (edge: Edge): Edge => ({
  //   ...edge,
  //   type: 'Edge',
  // }); future patch for custom edge

  const addNode = useCallback(
    (type: NodeTypes, category: NodeCategories): void => {
      const id = generateId(category, type);

      const position = {
        x: popperMenuContext.getRect().left,
        y: popperMenuContext.getRect().top,
      };

      setElements((elements: Elements) =>
        elements.concat({
          id,
          type,
          position,
          data: {
            config: configs[type],
          },
        })
      );

      popperMenuContext.hide();
    },
    [popperMenuContext, setElements]
  );

  const onPaneClick = (): void => {
    popperMenuContext.hide();
  };

  const onPaneContextMenu = (
    event: React.MouseEvent<Element, MouseEvent>
  ): void => {
    event.preventDefault();

    popperMenuContext.setRect({
      top: event.clientY,
      left: event.clientX,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    });

    popperMenuContext.show(
      <ContextMenu addNode={addNode} />
    );
  };

  const onLoad: OnLoadFunc = (params) => {
    const elements = params.getElements();

    const nodes = elements.filter(isNode);
    const edges = elements.filter(isEdge);

    const patchedNodes = nodes; // nodes.map(patchNode);
    const patchedEdges = edges; // edges.map(patchEdge);

    const patchedElements = [
      patchedNodes,
      patchedEdges,
    ].flat();

    setElements(patchedElements);
  };

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      onPaneClick={onPaneClick}
      onPaneContextMenu={onPaneContextMenu}
      nodeTypes={NODE_TYPES}
      edgeTypes={EDGE_TYPES}
      deleteKeyCode={BACKSPACE_KEYCODE}
      style={{ zIndex: 0 }}
    />
  );
};

export { Flow };
