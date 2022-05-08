import React, { FC, useCallback, useState } from 'react';
import { ToneAudioNode } from 'tone';
import ReactFlow, {
  addEdge,
  OnConnect as OnConnectT,
  OnEdgesChange as OnEdgesChangeT,
  OnEdgesDelete as OnEdgesDeleteT,
  OnInit as OnInitT,
  OnNodesChange as OnNodesChangeT,
  OnNodesDelete as OnNodesDeleteT,
  useReactFlow,
} from 'react-flow-renderer';
import { FlowEdgeT, FlowNodeT } from './Flow.models';
import {
  applyEdges,
  applyNodes,
  isAudioHandles,
  isAudioNodes,
} from './Flow.utils';

import { usePopperMenu } from 'context/PopperMenu';

import { useConnections } from 'store/useConnections';
import {
  createNotification,
  NotificationTypes,
  useNotifications,
} from 'store/useNotifications';

import { EMPTY_ARRAY } from 'utils/constants';
import { generateId } from 'utils/generateId';
import { checkConnection } from 'utils/checkConnection';
import { tryCatch } from 'utils/tryCatch';
import { extractAudioNodes } from 'utils/extractAudioNodes';

import { ContextMenu } from 'components/ContextMenu/ContextMenu';
import {
  NodeCategories,
  NodeTypes,
} from 'components/Nodes/models';

import { nodesConfigs } from 'configs/nodes';

import {
  Divide,
  Multiply,
  Subtract,
  Sum,
} from 'components/Nodes/Math/Operation/Operation';
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

const NODE_TYPES: Record<NodeTypes, FC<FlowNodeT<any>>> = {
  [NodeTypes.Sum]: Sum,
  [NodeTypes.Subtract]: Subtract,
  [NodeTypes.Multiply]: Multiply,
  [NodeTypes.Divide]: Divide,
  [NodeTypes.Number]: Number,

  [NodeTypes.Bang]: Bang,
  [NodeTypes.Metro]: Metro,
  [NodeTypes.Switch]: Switch,
  [NodeTypes.Defer]: Defer,

  [NodeTypes.Sine]: Sine,
  [NodeTypes.Triangle]: Triangle,
  [NodeTypes.Sawtooth]: Sawtooth,
  [NodeTypes.Square]: Square,
  [NodeTypes.Destination]: Destination,
  [NodeTypes.Analyser]: Analyser,
  [NodeTypes.Noise]: Noise,
  [NodeTypes.BiquadFilter]: BiquadFilter,
};

const EDGE_TYPES = {}; // TODO create custom edge

const connectAudioNodes = (
  sourceNode: FlowNodeT,
  targetNode: FlowNodeT
): void => {
  const [sourceAudioNode, targetAudioNode] =
    extractAudioNodes(sourceNode, targetNode);

  if (sourceAudioNode && targetAudioNode) {
    sourceAudioNode.connect(targetAudioNode);
  }
};

const disconnectAudioNodes = (
  sourceNode: FlowNodeT,
  targetNode: FlowNodeT
): void => {
  const [sourceAudioNode, targetAudioNode] =
    extractAudioNodes(sourceNode, targetNode);

  if (sourceAudioNode && targetAudioNode) {
    sourceAudioNode.disconnect(targetAudioNode);
  }
};

const Flow: FC = () => {
  const popperMenu = usePopperMenu();
  const notifications = useNotifications();

  const { getNode } = useReactFlow();
  const { setConnection, removeConnection } =
    useConnections();

  const [nodes, setNodes] =
    useState<Array<FlowNodeT>>(EMPTY_ARRAY);

  const [edges, setEdges] =
    useState<Array<FlowEdgeT>>(EMPTY_ARRAY);

  const onNodesChange: OnNodesChangeT = (changes) => {
    setNodes((nodes) => applyNodes(changes, nodes));
  };

  const onEdgesChange: OnEdgesChangeT = (changes) => {
    setEdges((edges) => applyEdges(changes, edges));
  };

  const onNodesDelete: OnNodesDeleteT = (nodesToRemove) => {
    //
  };

  const onEdgesDelete: OnEdgesDeleteT = (edgesToRemove) => {
    edgesToRemove.forEach((edge) => {
      const { source, target, sourceHandle, targetHandle } =
        edge;

      const sourceNode = getNode(source) as
        | FlowNodeT
        | undefined;
      const targetNode = getNode(target) as
        | FlowNodeT
        | undefined;

      if (
        !sourceNode ||
        !targetNode ||
        !sourceHandle ||
        !targetHandle
      ) {
        return;
      }

      if (
        isAudioNodes(source, target) &&
        isAudioHandles(sourceHandle, targetHandle)
      ) {
        disconnectAudioNodes(sourceNode, targetNode);
      }

      removeConnection(targetHandle);
    });
  };

  const onConnect: OnConnectT = (connectionParams) => {
    const { source, target, sourceHandle, targetHandle } =
      connectionParams;

    if (
      !source ||
      !target ||
      !sourceHandle ||
      !targetHandle
    ) {
      return;
    }

    const { isValid, sourceDataType, targetDataType } =
      checkConnection(sourceHandle, targetHandle);

    if (!isValid) {
      notifications.add(
        createNotification(
          NotificationTypes.InvalidConnection,
          `Type ${sourceDataType} does not match type ${targetDataType}`
        )
      );
      return;
    }

    const sourceNode = getNode(source) as
      | FlowNodeT
      | undefined;
    const targetNode = getNode(target) as
      | FlowNodeT
      | undefined;

    if (!sourceNode || !targetNode) {
      return;
    }

    if (
      isAudioNodes(source, target) &&
      isAudioHandles(sourceHandle, targetHandle)
    ) {
      connectAudioNodes(sourceNode, targetNode);
    }

    setConnection(targetHandle, {
      sourceHandle,
      sourceNode,
      targetHandle,
      targetNode,
    });

    [sourceNode, targetNode].forEach((node) => {
      node.data.methods.updateConnection = () =>
        setConnection(targetHandle, {
          sourceHandle,
          sourceNode,
          targetHandle,
          targetNode,
        });
    });

    setEdges((edges) => addEdge(connectionParams, edges));
  };

  const addNode = useCallback(
    (type: NodeTypes, category: NodeCategories): void => {
      const id = generateId(category, type);

      const position = {
        x: popperMenu.getRect().left,
        y: popperMenu.getRect().top,
      };

      setNodes((nodes) =>
        nodes.concat({
          id,
          type,
          position,
          data: {
            value: null,
            config: nodesConfigs[type],
            methods: {
              say: (phrase) => {
                console.log(`${id} say "${phrase}"`);
              },
              setParam: (param, setter) => {
                tryCatch(
                  () => setter(param),
                  (error) =>
                    notifications.errorHandler(error)
                );
              },
              executeAudioNode:
                (audioNode: ToneAudioNode) => () => {
                  if (
                    !(
                      'start' in audioNode &&
                      'stop' in audioNode
                    )
                  ) {
                    return;
                  }

                  //@ts-ignore
                  audioNode.start();
                  return () => {
                    //@ts-ignore
                    audioNode.stop();
                  };
                },
            },
          },
        })
      );

      popperMenu.hide();
    },
    [popperMenu, setNodes]
  );

  const onPaneClick = (): void => {
    popperMenu.hide();
  };

  const onPaneContextMenu = (
    event: React.MouseEvent<Element, MouseEvent>
  ): void => {
    event.preventDefault();

    popperMenu.setRect({
      top: event.clientY,
      left: event.clientX,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    });

    popperMenu.show(<ContextMenu onChooseItem={addNode} />);
  };

  const onInit: OnInitT = (params) => {
    const nodes = params.getNodes();
    const edges = params.getEdges();

    const patchedNodes = nodes; // TO nodes.map(patchNode); patch nodes when app is load...
    const patchedEdges = edges; // DO edges.map(patchEdge); patch edges when app is load...

    setNodes(patchedNodes as Array<FlowNodeT>);
    setEdges(patchedEdges as Array<FlowEdgeT>);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      onConnect={onConnect}
      onInit={onInit}
      onPaneClick={onPaneClick}
      onPaneContextMenu={onPaneContextMenu}
      nodeTypes={NODE_TYPES}
      edgeTypes={EDGE_TYPES}
      style={{ zIndex: 0 }}
      // Before the line connect, when dragging
      // connectionLineStyle={{ strokeWidth: 2 }}
    />
  );
};

export { Flow };
