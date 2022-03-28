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
import { isNode } from 'utils/isNode';
import { NodeTypes } from 'components/Nodes/models';

import { Sum } from 'components/Nodes/Math/Sum/Sum';
import { Number } from 'components/Nodes/Math/Number/Number';
import { Bang } from 'components/Nodes/Utilities/Bang/Bang';
import { Metro } from 'components/Nodes/Utilities/Metro/Metro';
import { Switch } from 'components/Nodes/Utilities/Switch/Switch';

const BACKSPACE_KEYCODE = 8;

const EDGE_TYPES = {}; // TODO create custom edge

const NODE_TYPES = {
  [NodeTypes.Sum]: Sum,
  [NodeTypes.Number]: Number,
  [NodeTypes.Bang]: Bang,
  [NodeTypes.Metro]: Metro,
  [NodeTypes.Switch]: Switch,
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

  // const patchNode = (node: Node<any>): Node<any> => {
  //     return {
  //       ...node,
  //       data: {
  //         //
  //       },
  //     };
  //   }
  // };

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
            // module: buildModule(audioContext, type),
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

    const patchedNodes = nodes; // nodes.map(patchNode);
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
