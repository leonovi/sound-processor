import create, { StateCreator } from 'zustand';
import {
  FlowNodeT,
  NodeValueT,
} from 'components/Flow/Flow.models';
import { isUndefined } from 'utils/isUndefined';

type ConnectionInfoT = {
  sourceHandle: string;
  sourceNode: FlowNodeT;
  targetHandle: string;
  targetNode: FlowNodeT;
};

type SetConnectionT = (
  id: string,
  connectionInfo: ConnectionInfoT
) => void;
type RemoveConnectionT = (id: string) => void;
type GetConnectionT = (id: string) => ConnectionInfoT;
type GetSourceValueT = (id: string) => NodeValueT;

export type ConnectionsStoreT = {
  byId: Record<string, ConnectionInfoT>;
  setConnection: SetConnectionT;
  removeConnection: RemoveConnectionT;
  getConnection: GetConnectionT;
  getSourceValue: GetSourceValueT;
};

const initializer: StateCreator<ConnectionsStoreT> = (
  set,
  get
) => ({
  byId: {},

  setConnection: (id, connectionInfo) => {
    set({
      byId: { ...get().byId, [id]: connectionInfo },
    });
  },

  removeConnection: (id) => {
    set({
      byId: Object.fromEntries([
        ...Object.entries(get().byId).filter(
          ([key]) => key !== id
        ),
      ]),
    });
  },

  getConnection: (id) => {
    return get().byId[id];
  },

  getSourceValue: (id) => {
    const sourceValue =
      get().byId[id]?.sourceNode?.data?.value;

    return isUndefined(sourceValue) ? null : sourceValue;
  },
});

export const useConnections =
  create<ConnectionsStoreT>(initializer);
