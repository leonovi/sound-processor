import { generateId } from 'utils/generateId';
import create, { StateCreator } from 'zustand';

export enum NotificationTypes {
  InvalidConnection = 'Invalid connection',
  RangeError = 'Range error',
}

export type NotificationT = {
  id: string;
  type: NotificationTypes;
  message: string;
};

export type NotificationsStoreT = {
  notifications: Array<NotificationT>;
  add: (notification: NotificationT) => void;
  remove: (id: string) => void;
  errorHandler: (error: unknown) => void;
};

export const createNotification = (
  type: NotificationTypes,
  message: string
): NotificationT => ({
  id: generateId('NOTIFICATION', type),
  type,
  message,
});

const initializer: StateCreator<NotificationsStoreT> = (
  set,
  get
) => ({
  notifications: [],

  add: (notification) => {
    set({
      notifications:
        get().notifications.concat(notification),
    });
  },
  remove: (id) => {
    set({
      notifications: get().notifications.filter(
        (notification) => notification.id !== id
      ),
    });
  },
  errorHandler: (error: unknown) => {
    const notifications = get();

    if (error instanceof RangeError) {
      notifications.add(
        createNotification(
          NotificationTypes.RangeError,
          'TODO create great message'
        )
      );
    }
  },
});

export const useNotifications =
  create<NotificationsStoreT>(initializer);
