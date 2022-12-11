import { useState } from 'react';
import { myRequest } from '../../utils/axios';
import s from './HWDoneButton.module.css';

let timer;
const timerMax = 3;

export const HWDoneButton = ({
    onAfterAprove,
    lessonId,
    studentId
}: {
    onAfterAprove?: any;
    lessonId: string | undefined;
    studentId: string | undefined;
}) => {
    const [counter, setCounter] = useState(0);
    const aproveHomework = () => {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
            setCounter(0);
            return;
        }
        setCounter(timerMax);
        const handleApproveHomework = () => {
            if (!lessonId || !studentId) {
                return;
            }
            myRequest
                .post('/user/done', {
                    lessonId,
                    userId: studentId
                })
                .then((res) => {
                    onAfterAprove && onAfterAprove(res);
                });
        };
        const counterFunc = () => {
            timer = setTimeout(() => {
                setCounter((prev) => {
                    const next = prev - 1;
                    if (next === 0) {
                        handleApproveHomework();
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
        <div className={s.root} onClick={aproveHomework}>
            {counter ? 'Cancel approve: ' + counter : 'Approve homework'}
        </div>
    );
};
