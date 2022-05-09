import create, { StateCreator } from 'zustand';
import { isUndefined } from 'utils/isUndefined';
import { ConnectionsStoreT } from './models';

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
