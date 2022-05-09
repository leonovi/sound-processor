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
