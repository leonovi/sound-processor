import React, { FC, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import b_ from 'b_';
import './Notification.css';
import {
  NotificationsTypes,
  useNotificationsContext,
} from 'context/NotificationsContext';
import { NotificationPropsT } from './Notification.models';

const TRANSITION_TIMEOUT = 200; // CSS animation duration
const NOTIFICATION_LIFETIME = 3000;

const NotificationTitle = {
  [NotificationsTypes.InvalidConnection]: 'Invalid connection',
};

const b = b_.with('notification');

const Notification: FC<NotificationPropsT> = ({ id, type, message }) => {
  const [showTrigger, setShowTrigger] = useState(true);
  const hideNotification = () => setShowTrigger(false);

  const { remove } = useNotificationsContext();
  const removeNotification = () => remove(id);

  useEffect(() => {
    const timeoutId = setTimeout(hideNotification, NOTIFICATION_LIFETIME);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Transition
      in={showTrigger}
      timeout={TRANSITION_TIMEOUT}
      onExited={removeNotification}
    >
      {(transitionState) => (
        <div className={b({ state: transitionState })}>
          <header className={b('header')}>
            <span className={b('title')}>{NotificationTitle[type]}</span>
            <button className={b('close')} onClick={hideNotification}>
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
