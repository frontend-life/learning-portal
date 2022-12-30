import { useEffect, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { cls } from '../../utils/css';
import s from './Notification.module.css';

export type NotificationType = 's' | 'warn' | 'err';
export type NotificationProps = {
    id: number;
    type?: NotificationType;
    description: string;
    onClose: (id: number) => void;
};

const duration = 3;

export const Notification = ({
    id,
    type = 's',
    description,
    onClose
}: NotificationProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const rootClass = cls(s.root, {
        [s.rootWarn]: type === 'warn',
        [s.rootErr]: type === 'err'
    });
    const text = (() => {
        switch (type) {
            case 's':
                return 'Notification';
            case 'warn':
                return 'Warning';
            case 'err':
                return 'Error';
        }
    })();

    useLayoutEffect(() => {
        ref.current?.style.setProperty('--animation-duration', `${duration}s`);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            onClose(id);
        }, duration * 1000);
    }, [id, onClose]);

    return (
        <div className={rootClass}>
            <p className={s.text}>{text}</p>
            <p className={s.text}>{description}</p>
            <hr className={s.hr} />
            <div ref={ref} className={s.progress} />
        </div>
    );
};
