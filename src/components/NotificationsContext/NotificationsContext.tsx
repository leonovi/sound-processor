import React, { FC, useMemo, useState } from 'react';
import {
  NotificationsContext,
  NotificationsContextT,
  NotificationT,
} from 'context/NotificationsContext';
import { filter } from 'utils/filter';
import { NotificationsManager } from './NotificationsManager/NotificationsManager';

const DEFAULT_NOTIFICATIONS: Array<NotificationT> = [];

const NotificationsContextProvider: FC = ({ children }) => {
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);

  const notificationsContext = useMemo(
    (): NotificationsContextT => ({
      get: () => notifications,
      add: (notification) =>
        setNotifications((notifications) => [...notifications, notification]),
      remove: (id) =>
        setNotifications((notifications) =>
          filter(notifications, (notification) => notification.id !== id)
        ),
    }),
    []
  );

  return (
    <NotificationsContext.Provider value={notificationsContext}>
      {children}
      <NotificationsManager notifications={notifications} />
    </NotificationsContext.Provider>
  );
};

export { NotificationsContextProvider as NotificationsContext };
