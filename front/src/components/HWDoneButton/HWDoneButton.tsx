import { addWNt } from '@utils/notification';
import { useState } from 'react';
import { myRequest } from '../../utils/axios';
import s from './HWDoneButton.module.css';

let timer;
const timerMax = 3;

export const HWDoneButton = ({
    onAfterAprove,
    lessonId,
    studentId,
    type
}: {
    onAfterAprove?: any;
    lessonId: string | undefined;
    studentId: string | undefined;
    type: 'approve' | 'disaprove';
}) => {
    const [counter, setCounter] = useState(0);
    const isApproving = type === 'approve';
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
                addWNt('no lesson or student');
                return;
            }
            const url = isApproving ? '/user/done' : '/user/notdone';
            myRequest
                .post(url, {
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
            {counter
                ? `Cancel ${isApproving ? 'approve' : 'disaprove'}: ${counter}`
                : isApproving
                ? 'Approve homework'
                : 'Disapprove homework'}
        </div>
    );
};
