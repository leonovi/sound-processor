import { generateId } from 'utils/generateId';
import create, { StateCreator } from 'zustand';
import {
  NotificationsStoreT,
  NotificationT,
  NotificationTypes,
} from './models';

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
