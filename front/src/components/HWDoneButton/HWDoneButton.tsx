import { useEffect, useState } from 'react';
import s from './HWDoneButton.module.css';

let timer;
const timerMax = 3;

export const HWDoneButton = ({ onClick }: { onClick?: any }) => {
    const [counter, setCounter] = useState(0);
    const handleCheckHW = () => {
        if (!onClick) {
            return;
        }
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
            setCounter(0);
            return;
        }
        setCounter(timerMax);
        const counterFunc = () => {
            timer = setTimeout(() => {
                setCounter((prev) => {
                    const next = prev - 1;
                    if (next === 0) {
                        onClick();
                        timer = undefined;
                        return next;
                    }
                    counterFunc();
                    return next;
                });
            }, 1000);
        };
        counterFunc();
    };

    return (
        <div className={s.root} onClick={handleCheckHW}>
            {counter ? counter : 'Homework DONE!'}
        </div>
    );
};
