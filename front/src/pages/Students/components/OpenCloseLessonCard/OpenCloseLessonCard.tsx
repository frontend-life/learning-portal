import { cls } from '@utils/css';
import { ILesson } from '../../../../types/api';

import { lockSvg as LockSVG } from '../lock';
import { unlockSvg as UnlockSVG } from '../unlock';
import { checkSvg as CheckSVG } from '../check';
import { uncheckSvg as UncheckSVG } from '../uncheck';

import { Switch } from '../../../../components/Switch/Switch';

import s from './OpenCloseLessonCard.module.css';
import { useState } from 'react';

export const OpenCloseLessonCard = ({
    lesson,
    isOpen,
    isDone,
    onClose,
    onOpen,
    onDone,
    onNotDone
}: {
    lesson: ILesson;
    isOpen: boolean;
    isDone: boolean;
    onClose: (lesson: ILesson) => Promise<any>;
    onOpen: (lesson: ILesson) => Promise<any>;
    onDone: (lesson: ILesson) => Promise<any>;
    onNotDone: (lesson: ILesson) => Promise<any>;
}) => {
    const [loadingOpenSwitch, setLoadingOpenSwitch] = useState(false);
    const [loadingDoneSwitch, setLoadingDoneSwitch] = useState(false);

    const handleOpenClose = () => {
        setLoadingOpenSwitch(true);
        (isOpen ? onClose(lesson) : onOpen(lesson)).finally(() => {
            setLoadingOpenSwitch(false);
        });
    };

    const handleDoneOrNot = () => {
        setLoadingDoneSwitch(true);
        (isDone ? onNotDone(lesson) : onDone(lesson)).finally(() => {
            setLoadingDoneSwitch(false);
        });
    };

    return (
        <div className={s.root} key={lesson._id}>
            <h4 className={s.lessonTitle} title={lesson.title}>
                {lesson.title}
            </h4>

            <div className={s.statuses}>
                <div
                    className={cls(s.status, {
                        [s.isOpen]: isOpen,
                        [s.isClosed]: !isOpen
                    })}
                    onClick={handleOpenClose}
                >
                    <span className={s.switchText}>
                        Closed
                        <LockSVG />
                    </span>
                    <div className={s.switch}>
                        <Switch
                            defaultCheck={isOpen}
                            disabled={loadingOpenSwitch}
                        />
                    </div>
                    <span className={s.switchText}>
                        Open
                        <UnlockSVG />
                    </span>
                </div>

                <div
                    className={cls(s.status, {
                        [s.isDone]: isDone,
                        [s.isNotDone]: !isDone
                    })}
                    onClick={handleDoneOrNot}
                >
                    <span className={s.switchText}>
                        Not done
                        <UncheckSVG />
                    </span>
                    <div className={s.switch}>
                        <Switch
                            defaultCheck={isDone}
                            disabled={loadingDoneSwitch}
                        />
                    </div>
                    <span className={s.switchText}>
                        Done
                        <CheckSVG />
                    </span>
                </div>
            </div>
        </div>
    );
};
