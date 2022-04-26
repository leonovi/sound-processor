import { createContext, useContext } from 'react';
import { generateId } from 'utils/generateId';

export enum NotificationsTypes {
  InvalidConnection = 'InvalidConnection',
  RangeError = 'RangeError',
}

export type NotificationT = {
  id: string;
  type: NotificationsTypes;
  message: string;
};

export type NotificationsContextT = {
  get: () => Array<NotificationT>;
  add: (notification: NotificationT) => void;
  remove: (id: string) => void;
};

export const createNotification = (
  type: NotificationsTypes,
  message: string
): NotificationT => ({
  id: generateId('NOTIFICATION', type),
  type,
  message,
});

export const NotificationsContext = createContext<NotificationsContextT>(null!);

export const useNotifications = () => useContext(NotificationsContext);
