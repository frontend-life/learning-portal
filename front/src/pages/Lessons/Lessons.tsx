import { addWNt } from '@utils/notification';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { useLessonsContext } from '../../store/LessonsContext';
import { useUserContext } from '../../store/UserDetails';
import { ILesson, Roles } from '../../types/api';
import { cls } from '../../utils/css';
import { PATHS } from '../../utils/paths';
import { DoneSvg } from './doneSvg';
import s from './Lessons.module.css';
import { LockSvg } from './lockSvg';

export function Lessons() {
    const {
        userDetails: { lessonsDone, lessonsOpen, _id, roles }
    } = useUserContext();
    const navigate = useNavigate();
    const { lessons, courses, loadingStatus } = useLessonsContext();
    const dragingLessonID = useRef<string>('');
    const dragingCourseID = useRef<string>('');

    const [orderedLessons, setOrderedLessons] = useState(lessons);
    useEffect(() => {
        setOrderedLessons(lessons);
    }, [lessons]);

    const handleClick = (lesson: ILesson) => {
        navigate(`${PATHS.lesson}?lessonId=${lesson._id}&studentId=${_id}`, {
            state: lesson
        });
    };

    const coursesSorted = useMemo(() => {
        return courses.sort((a, b) => {
            return a.order - b.order;
        });
    }, [courses]);

    const isTeacher = roles.includes(Roles.TEACHER);

    const dragStartHandler = (e) => {
        const lessonId = e.target.dataset.lessonId;
        const courseId = e.target.dataset.courseId;
        dragingLessonID.current = lessonId;
        dragingCourseID.current = courseId;
    };
    const dropHandler = (e) => {
        e.preventDefault();
        const { courseId, lessonId } = e.target.dataset;
        e.target.style.opacity = 1;

        if (courseId !== dragingCourseID.current) {
            addWNt('You cant change lessons between courses');
            return;
        }

        const lessonsFromCourse: ILesson[] = orderedLessons.filter(
            ({ course }) => {
                return course === courseId;
            }
        );

        const thisCourse = courses.find((course) => course._id === courseId);

        const draggingLessonIndex = lessonsFromCourse.findIndex(
            (l) => l._id === dragingLessonID.current
        );
        const dropedLessonIndex = lessonsFromCourse.findIndex(
            (l) => l._id === lessonId
        );

        // Continue when change DB
        // thisCourse?.lessonsOrder.splice(
        //     draggingLessonIndex,
        //     1,
        //     dragingLessonID.current
        // );
    };
    const dragOverHandler = (e) => {
        e.preventDefault();
        const lessonId = e.target.dataset.lessonId;
        if (lessonId === dragingLessonID.current) {
            console.log(true);
            return;
        }
        console.log(lessonId, dragingLessonID.current);

        e.target.style.opacity = 0.3;
    };
    const dragLeaveHandler = (e) => {
        e.preventDefault();
        e.target.style.opacity = 1;
    };

    return (
        <MainBlockWrapper title="Lessons">
            <div className={s.root}>
                {loadingStatus ? (
                    <CircleLoader inCenterOfBlock />
                ) : (
                    <>
                        <nav className={s.lessonsNav}>
                            {coursesSorted.map((c) => {
                                return (
                                    <div key={c._id}>
                                        <a href={`#${c._id}`}>{c.title}</a>
                                    </div>
                                );
                            })}
                        </nav>
                        <div className={s.lessonsScroll}>
                            {coursesSorted.map((c) => {
                                return (
                                    <React.Fragment key={c._id}>
                                        <div
                                            className={s.courseTitle}
                                            id={c._id}
                                        >
                                            <div
                                                className={cls(
                                                    s.courseTitleLine,
                                                    s.courseTitleLeftLine
                                                )}
                                            />
                                            <span className={s.title}>
                                                {c.title}
                                            </span>
                                            <div
                                                className={cls(
                                                    s.courseTitleLine,
                                                    s.courseTitleRightLine
                                                )}
                                            />
                                        </div>
                                        <div className={s.lessonsBlock}>
                                            {orderedLessons
                                                .filter(
                                                    (l) => l.course === c._id
                                                )
                                                .map((lesson) => {
                                                    const { _id } = lesson;
                                                    const isDone =
                                                        lessonsDone.includes(
                                                            _id
                                                        );
                                                    const isOpen =
                                                        lessonsOpen.includes(
                                                            _id
                                                        ) || isTeacher;
                                                    const selectors: string[] =
                                                        [s.square];
                                                    if (isDone) {
                                                        selectors.push(s.done);
                                                    }
                                                    if (isOpen) {
                                                        selectors.push(s.open);
                                                    } else {
                                                        selectors.push(
                                                            s.closed
                                                        );
                                                    }
                                                    return (
                                                        <div
                                                            data-course-id={
                                                                c._id
                                                            }
                                                            data-lesson-id={
                                                                lesson._id
                                                            }
                                                            draggable={
                                                                isTeacher
                                                            }
                                                            onDragStart={
                                                                dragStartHandler
                                                            }
                                                            onDrop={dropHandler}
                                                            onDragOver={
                                                                dragOverHandler
                                                            }
                                                            onDragLeave={
                                                                dragLeaveHandler
                                                            }
                                                            key={lesson._id}
                                                            className={
                                                                s.lessonRoot
                                                            }
                                                        >
                                                            <div
                                                                className={cls(
                                                                    ...selectors
                                                                )}
                                                                onClick={() => {
                                                                    handleClick(
                                                                        lesson
                                                                    );
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
                    </>
                )}
            </div>
        </MainBlockWrapper>
    );
}
