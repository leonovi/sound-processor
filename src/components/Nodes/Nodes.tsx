import React, { FC, useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  Node,
  isEdge,
  OnLoadFunc,
  removeElements,
  Elements,
} from 'react-flow-renderer';
import { nanoid } from 'nanoid';

import { useAudioContext } from 'context/AudioContext';
import { usePopperMenuContext } from 'context/PopperMenuContext';

import { Destination } from 'components/Nodes/Destination/Destination';
import { ContextMenu } from 'components/ContextMenu/ContextMenu';
import { NoiseProcessor } from 'components/Nodes/NoiseProcessor/NoiseProcessor';

import { NodeTypes } from 'utils/nodeTypes';
import { getModule } from 'utils/getModule';
import { isNode } from 'utils/isNode';
import { isAudioWorklet } from 'utils/isAudioWorklet';
import { stopModule } from 'utils/stopModule';

export type NodeData = {
  module: AudioNode | null;
};

const BACKSPACE_KEYCODE = 8;

const NODE_TYPES = {
  [NodeTypes.DESTINATION]: Destination,
  [NodeTypes.NOISE_PROCESSOR]: NoiseProcessor,
};

const EDGE_TYPES = {}; // TODO create custom edge

const DESTINATION_NODE: Node<NodeData> = {
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

const findAssociatedModules = (
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

const Nodes: FC = () => {
  const audioContext = useAudioContext();
  const popperMenuContext = usePopperMenuContext();

  const [elements, setElements] = useState<Elements>([DESTINATION_NODE]);

  const connectModules = (
    source: string | null,
    target: string | null
  ): void => {
    const { sourceModule, targetModule } = findAssociatedModules(
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
    const { sourceModule, targetModule } = findAssociatedModules(
      elements,
      source,
      target
    );

    if (sourceModule && targetModule) {
      sourceModule.disconnect(targetModule);

      if (isAudioWorklet(sourceModule)) {
        stopModule(sourceModule);
      }
    }
  };

  const onElementsRemove = (elementsToRemove: Elements): void => {
    const edgesToRemove = elementsToRemove.filter(isEdge);

    edgesToRemove.forEach(({ source, target }) =>
      disconnectModules(source, target)
    );

    setElements((elements) => removeElements(elementsToRemove, elements));
  };

  const onConnect = (connectionParams: Edge | Connection): void => {
    const { source, target } = connectionParams;

    connectModules(source, target);

    setElements((elements) => addEdge(connectionParams, elements));
  };

  const patchNode = (node: Node<NodeData>): Node<NodeData> => ({
    ...node,
    data: {
      module: getModule(audioContext, node.type),
    },
  });

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

      setElements((elements: Elements) =>
        elements.concat({
          id,
          type,
          position,
          data: {
            module: getModule(audioContext, type),
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

export { Nodes };
