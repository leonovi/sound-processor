import React, { FC } from 'react';
import b_ from 'b_';
import './NotificationsManager.css';
import { Notification } from './Notification/Notification';
import { useNotifications } from 'store/useNotifications';

const b = b_.with('notifications-manager');

const NotificationsManager: FC = () => {
  const { notifications } = useNotifications();
  return (
    <div className={b()}>
      {notifications.map(({ id, type, message }) => (
        <Notification
          key={id}
          id={id}
          type={type}
          message={message}
        />
      ))}
    </div>
  );
};

export { NotificationsManager };
