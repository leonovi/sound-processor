import {
  applyEdgeChanges,
  applyNodeChanges,
  EdgeChange as EdgeChangeT,
  NodeChange as NodeChangeT,
} from 'react-flow-renderer';
import { NodeCategories } from 'components/Nodes/models';
import { AUDIO_HANDLE_IDENTITY } from 'utils/constants';
import { FlowEdgeT, FlowNodeT } from './Flow.models';

export const applyNodes = (
  changes: Array<NodeChangeT>,
  nodes: Array<FlowNodeT>
) => applyNodeChanges(changes, nodes) as Array<FlowNodeT>;

export const applyEdges = (
  changes: Array<EdgeChangeT>,
  edges: Array<FlowEdgeT>
) => applyEdgeChanges(changes, edges);

export const isAudioNodes = (...ids: Array<string>) =>
  ids.every((id) => id.startsWith(NodeCategories.Audio));

export const isAudioHandles = (...handles: Array<string>) =>
  handles.every((handle) =>
    handle.match(AUDIO_HANDLE_IDENTITY)
  );
