import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { useLessonsContext } from '../../store/LessonsContext';
import { useUserContext } from '../../store/UserDetails';
import { ILesson } from '../../types/api';
import { cls } from '../../utils/css';
import { PATHS } from '../../utils/paths';
import { DoneSvg } from './doneSvg';
import s from './Lessons.module.css';
import { LockSvg } from './lockSvg';

export function Lessons() {
    const {
        userDetails: { lessonsDone, lessonsOpen, _id }
    } = useUserContext();
    const navigate = useNavigate();
    const { lessons, courses } = useLessonsContext();

    const handleClick = (lesson: ILesson) => {
        navigate(`${PATHS.lesson}?lessonId=${lesson._id}&studentId=${_id}`, {
            state: lesson
        });
    };

    return (
        <MainBlockWrapper title="Lessons">
            <div className={s.root}>
                {courses
                    .sort((a, b) => {
                        return a.order - b.order;
                    })
                    .map((c) => {
                        return (
                            <React.Fragment key={c._id}>
                                <div className={s.courseTitle}>
                                    <div
                                        className={cls(
                                            s.courseTitleLine,
                                            s.courseTitleLeftLine
                                        )}
                                    />
                                    <span className={s.title}>{c.title}</span>
                                    <div
                                        className={cls(
                                            s.courseTitleLine,
                                            s.courseTitleRightLine
                                        )}
                                    />
                                </div>
                                <div className={s.lessonsBlock}>
                                    {lessons
                                        .filter((l) => l.course === c._id)
                                        .map((lesson) => {
                                            const { _id } = lesson;
                                            const isDone =
                                                lessonsDone.includes(_id);
                                            const isOpen =
                                                lessonsOpen.includes(_id);
                                            const selectors: string[] = [
                                                s.square
                                            ];
                                            if (isDone) {
                                                selectors.push(s.done);
                                            }
                                            if (isOpen) {
                                                selectors.push(s.open);
                                            } else {
                                                selectors.push(s.closed);
                                            }
                                            return (
                                                <div
                                                    key={lesson._id}
                                                    className={s.lessonRoot}
                                                >
                                                    <div
                                                        className={cls(
                                                            ...selectors
                                                        )}
                                                        onClick={() => {
                                                            handleClick(lesson);
                                                        }}
                                                    >
                                                        {isDone && (
                                                            <div
                                                                className={
                                                                    s.doneSvg
                                                                }
                                                            >
                                                                <DoneSvg />
                                                            </div>
                                                        )}
                                                        {!isOpen && (
                                                            <div
                                                                className={
                                                                    s.lockSvg
                                                                }
                                                            >
                                                                <LockSvg />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p
                                                        className={
                                                            s.lessonTitle
                                                        }
                                                        key={lesson._id}
                                                    >
                                                        {lesson.title}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </React.Fragment>
                        );
                    })}
            </div>
        </MainBlockWrapper>
    );
}
