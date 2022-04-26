import React, { FC } from 'react';
import b_ from 'b_';
import './NotificationsManager.css';
import { NotificationT } from 'context/NotificationsContext';
import { NotificationManagerPropsT } from './NotificationsManager.models';
import { Notification } from './Notification/Notification';

const renderNotification = ({
  id,
  type,
  message,
}: NotificationT) => (
  <Notification
    key={id}
    id={id}
    type={type}
    message={message}
  />
);

const b = b_.with('notifications-manager');

const NotificationsManager: FC<
  NotificationManagerPropsT
> = ({ notifications }) => (
  <div className={b()}>
    {notifications.map(renderNotification)}
  </div>
);

export { NotificationsManager };
