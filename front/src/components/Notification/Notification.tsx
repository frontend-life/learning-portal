import { useRef } from 'react';
import ReactDOM from 'react-dom';
import s from './Notification.module.css';

export const Notification = () => {
    const ref = useRef<HTMLDivElement>(null);
    return ReactDOM.createPortal(
        <div
            className={s.root}
            onClick={() => {
                // For test
                ref.current?.classList.remove(s.progress);
                requestAnimationFrame(() => {
                    ref.current?.classList.add(s.progress);
                });
            }}
        >
            <p className={s.text}>TEXT</p>
            <hr className={s.hr} />
            <div ref={ref} className={s.progress} />
        </div>,
        document.body
    );
};
