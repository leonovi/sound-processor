import {
  FlowNodeT,
  NodeValueT,
} from 'components/Flow/Flow.models';

type ConnectionInfoT = {
  sourceHandle: string;
  sourceNode: FlowNodeT;
  targetHandle: string;
  targetNode: FlowNodeT;
};

export type ConnectionsStoreT = {
  byId: Record<string, ConnectionInfoT>;
  setConnection: (
    id: string,
    connectionInfo: ConnectionInfoT
  ) => void;
  removeConnection: (id: string) => void;
  getConnection: (id: string) => ConnectionInfoT;
  getSourceValue: (id: string) => NodeValueT;
};
