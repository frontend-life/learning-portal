import { NotificationProps } from '../components/Notification/Notification';
import { NotificationSystem } from '../components/NotificationSystem/NotificationSystem';

export default function addNt(
    params: Omit<NotificationProps, 'onClose' | 'id'>
) {
    NotificationSystem.allInstances.forEach((instance) => {
        const id = instance.state.notifications.length
            ? (instance.state.notifications[
                  instance.state.notifications.length - 1
              ]?.id || 0) + 1
            : 1;

        instance.addNotification({
            id,
            ...params
        });
    });
}

export const addErrorNt = (description: string) => {
    addNt({ type: 'err', description });
};
