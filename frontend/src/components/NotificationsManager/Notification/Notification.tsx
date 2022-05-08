import React, { FC, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import b_ from 'b_';
import './Notification.css';
import {
  NotificationT,
  NotificationTypes,
  useNotifications,
} from 'store/useNotifications';

const TRANSITION_TIMEOUT = 200; // CSS animation duration
const NOTIFICATION_LIFETIME = 3000;

const NotificationTitle = {
  [NotificationTypes.InvalidConnection]:
    'Invalid connection',
  [NotificationTypes.RangeError]: 'Range error',
};

const b = b_.with('notification');

const Notification: FC<NotificationT> = ({
  id,
  type,
  message,
}) => {
  const notifications = useNotifications();
  const [showTrigger, setShowTrigger] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(
      () => setShowTrigger(false),
      NOTIFICATION_LIFETIME
    );
    return () => clearTimeout(timerId);
  }, []);

  return (
    <Transition
      in={showTrigger}
      timeout={TRANSITION_TIMEOUT}
      onExited={() => notifications.remove(id)}
    >
      {(transitionState) => (
        <div className={b({ state: transitionState })}>
          <header className={b('header')}>
            <span className={b('title')}>
              {NotificationTitle[type]}
            </span>
            <button
              className={b('close')}
              onClick={() => setShowTrigger(false)}
            >
              x
            </button>
          </header>
          <div className={b('body')}>
            <span className={b('message')}>{message}</span>
          </div>
        </div>
      )}
    </Transition>
  );
};

export { Notification };
