import React, { FC, useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Connection as ConnectionT,
  Controls,
  Edge as EdgeT,
  Node as NodeT,
  Elements as ElementsT,
  isEdge,
  isNode,
  OnLoadFunc as OnLoadFuncT,
  removeElements,
} from 'react-flow-renderer';

import { usePopperMenuContext } from 'context/PopperMenuContext';

import { Destination } from 'components/Nodes/Destination/Destination';
import { ContextMenu } from 'components/ContextMenu/ContextMenu';
import { NoiseProcessor } from 'components/Nodes/NoiseProcessor/NoiseProcessor';
import { NodeTypes } from 'models/nodeTypes';

const BACKSPACE_KEYCODE = 8;

const NODE_TYPES = {
  [NodeTypes.DESTINATION]: Destination,
  [NodeTypes.NOISE_PROCESSOR]: NoiseProcessor,
};

const EDGE_TYPES = {}; // TODO create custom edge

const DESTINATION_NODE: NodeT = {
  id: 'destination',
  type: NodeTypes.DESTINATION,
  position: {
    x: 1200,
    y: 300,
  },
};

const initialElements = [DESTINATION_NODE];

const Nodes: FC = () => {
  const popperMenuContext = usePopperMenuContext();

  const [elements, setElements] = useState<ElementsT>(initialElements);

  const onElementsRemove = (elementsToRemove: ElementsT) => {
    setElements((elements) => removeElements(elementsToRemove, elements));
  };

  const onEdgeButtonClickFactory = () => {
    return (id: string) => {
      setElements((elements: ElementsT) =>
        elements.filter((element) => element.id !== id)
      );
    };
  };

  const onConnect = (connectionParams: EdgeT | ConnectionT) => {
    setElements((elements) =>
      addEdge(
        {
          ...connectionParams,
          type: 'edge',
          data: { onEdgeButtonClick: onEdgeButtonClickFactory() },
        },
        elements
      )
    );
  };

  const patchEdge = (edge: EdgeT) => ({
    ...edge,
    type: 'edge',
    data: { onEdgeButtonClick: onEdgeButtonClickFactory() },
  });

  const addNode = useCallback(
    (type: string) => {
      const id = `${type}-${new Date()}`;

      const position = {
        x: popperMenuContext.getRect().left,
        y: popperMenuContext.getRect().top,
      };

      const node = {
        id,
        type,
        position,
      };

      setElements((elements: ElementsT) => [...elements, node]);
      popperMenuContext.hide();
    },
    [popperMenuContext, setElements]
  );

  const onPaneClick = () => {
    popperMenuContext.hide();
  };

  const onPaneContextMenu = (event: React.MouseEvent<Element, MouseEvent>) => {
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

  const onLoad: OnLoadFuncT = (params) => {
    const elements = params.getElements();

    const nodes = elements.filter(isNode);
    const edges = elements.filter(isEdge);

    const patchedNodes = nodes.map((node) => node);
    const patchedEdges = edges.map(patchEdge);

    const patchedElements = [...patchedNodes, ...patchedEdges];

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
    >
      <Controls />
    </ReactFlow>
  );
};

export { Nodes };
