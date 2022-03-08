import React, { FC, useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  isEdge,
  OnLoadFunc,
  removeElements,
  Elements,
} from 'react-flow-renderer';
import { nanoid } from 'nanoid';

import { useAudioContext } from 'context/AudioContext';
import { usePopperMenuContext } from 'context/PopperMenuContext';

import { ContextMenu } from 'components/ContextMenu/ContextMenu';

import { buildModule } from 'utils/buildModule';
import {
  BACKSPACE_KEYCODE,
  EDGE_TYPES,
  Module,
  MODULE_PREFIX,
  NodeTypes,
  NODE_TYPES,
  Node,
  Source,
  SOURCE_PREFIX,
} from './Flow.models';
import { isModule } from 'utils/isModule';
import { isSource } from 'utils/isSource';
import { isNode } from 'utils/isNode';
import { buildParameters } from 'utils/buildParameters';
// import { isAudioWorklet } from 'utils/worklet/isAudioWorklet';

// import { sendStopMessage } from 'worklets/Processor/Processor.messages';

const DESTINATION_NODE: Node<Module> = {
  id: 'destination',
  type: NodeTypes.DESTINATION,
  position: {
    x: 1200,
    y: 300,
  },
  data: {
    module: null,
  },
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

  const sourceModule = sourceNode?.data?.module;
  const targetModule = targetNode?.data?.module;

  return { sourceModule, targetModule };
};

const Flow: FC = () => {
  const audioContext = useAudioContext();
  const popperMenuContext = usePopperMenuContext();

  const [elements, setElements] = useState<Elements>([DESTINATION_NODE]);

  const connectModules = (
    source: string | null,
    target: string | null
  ): void => {
    const { sourceModule, targetModule } = findModules(
      elements,
      source,
      target
    );

    sourceModule && targetModule && sourceModule.connect(targetModule);
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
      // isAudioWorklet(sourceModule) && sendStopMessage(sourceModule); // this permanently stop processor
    }
  };

  const onElementsRemove = (elementsToRemove: Elements): void => {
    const edgesToRemove = elementsToRemove.filter(isEdge);

    edgesToRemove.forEach(({ source, target }) =>
      disconnectModules(source, target)
    );

    const destinationNode = elementsToRemove.find(
      ({ id }) => id === DESTINATION_NODE.id
    );
    if (destinationNode) {
      console.log('DONT REMOVE DESTINATION');
      return;
    }

    setElements((elements) => removeElements(elementsToRemove, elements));
  };

  const onConnect = (connectionParams: Edge | Connection): void => {
    const { source, target } = connectionParams;

    connectModules(source, target);
    setElements((elements) => addEdge(connectionParams, elements));
  };

  const patchNode = (node: Node<any>): Node<any> => {
    if (isModule(node)) {
      return {
        ...node,
        data: {
          module: buildModule(audioContext, node.type),
          parameters: buildParameters(node.type),
        },
      };
    }

    if (isSource(node)) {
      return {
        ...node,
        data: {
          value: null,
        },
      };
    }

    return node;
  };

  // const patchEdge = (edge: Edge): Edge => ({
  //   ...edge,
  //   type: 'Edge',
  // }); future patch for custom edge

  const addNode = useCallback(
    (type: NodeTypes): void => {
      const id = `${type}-${nanoid()}`;

      const position = {
        x: popperMenuContext.getRect().left,
        y: popperMenuContext.getRect().top,
      };

      if (type.startsWith(MODULE_PREFIX)) {
        setElements((elements: Elements) =>
          elements.concat({
            id,
            type,
            position,
            data: {
              module: buildModule(audioContext, type),
              parameters: buildParameters(type),
            },
          })
        );
      }

      if (type.startsWith(SOURCE_PREFIX)) {
        setElements((elements: Elements) =>
          elements.concat({
            id,
            type,
            position,
            data: {
              value: null,
            },
          })
        );
      }
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

    popperMenuContext.show(<ContextMenu addNode={addNode} />);
  };

  const onLoad: OnLoadFunc = (params) => {
    const elements = params.getElements();

    const nodes = elements.filter(isNode);
    const edges = elements.filter(isEdge);

    const patchedNodes = nodes.map(patchNode);
    const patchedEdges = edges; // edges.map(patchEdge);

    const patchedElements = [patchedNodes, patchedEdges].flat();

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
