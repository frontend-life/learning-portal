import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
    Notification,
    NotificationProps,
    NotificationType
} from '../Notification/Notification';
import s from './NotificationSystem.module.css';

export class NotificationSystem extends React.PureComponent<
    any,
    {
        notifications: Array<{
            id: number;
            text: string;
            type: NotificationType;
        }>;
    }
> {
    static allInstances: Array<NotificationSystem> = [];
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };
        NotificationSystem.allInstances.push(this);
    }
    addNotification(notification: Omit<NotificationProps, 'onClose'>) {
        this.setState((prev) => {
            return {
                ...prev,
                notifications: [
                    ...prev.notifications,
                    {
                        id: prev.notifications.length
                            ? (prev.notifications[prev.notifications.length - 1]
                                  ?.id || 0) + 1
                            : 1,
                        text: notification.description,
                        type: notification.type || 's'
                    }
                ]
            };
        });
    }
    removeNotification(id: number) {
        this.setState((prev) => {
            return {
                ...prev,
                notifications: prev.notifications.filter(
                    ({ id: ID }) => ID !== id
                )
            };
        });
    }
    render() {
        return ReactDOM.createPortal(
            <Notifications
                notifications={this.state.notifications}
                removeNotification={this.removeNotification.bind(this)}
            />,
            document.body
        );
    }
}

type N = { notifications: any[]; removeNotification: any };
function Notifications({ notifications, removeNotification }: N) {
    const close = useCallback(
        (id) => {
            removeNotification(id);
        },
        [removeNotification]
    );

    return (
        <div className={s.root}>
            {notifications.map(({ id, text, type }) => {
                return (
                    <Notification
                        id={id}
                        key={id}
                        type={type}
                        description={text}
                        onClose={close}
                    />
                );
            })}
        </div>
    );
}
