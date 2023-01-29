import { Backend } from '@shared/Backend';
import { addWNt } from '@utils/notification';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from '@components/CircleLoader/CircleLoader';
import MainBlockWrapper from '@components/MainBlockWrapper/MainBlockWrapper';
import { useLessonsContext } from '@store/LessonsContext';
import { useUserContext } from '@store/UserDetails';
import { ICourse, ILesson } from '@type/api';
import { cls } from '@utils/css';
import { PATHS } from '@utils/paths';
import { DoneSvg } from './doneSvg';
import s from './Lessons.module.css';
import { LockSvg } from './lockSvg';
import { CoursePanelItem } from '@components/CoursePanelItem/CoursePanelItem';

export function Lessons() {
    const { courses, loadingStatus } = useLessonsContext();

    const coursesSorted = useMemo(() => {
        return courses.sort((a, b) => {
            return a.order - b.order;
        });
    }, [courses]);

    useLayoutEffect(() => {
        if (!coursesSorted.length) {
            return;
        }

        const { hash } = window.location;
        if (hash) {
            setTimeout(() => {
                const courseBlock = document.getElementById(hash.slice(1));
                courseBlock?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [coursesSorted]);

    return (
        <MainBlockWrapper title="Lessons">
            <div className={s.root}>
                {loadingStatus ? (
                    <CircleLoader inCenterOfBlock />
                ) : (
                    <>
                        <nav className={s.lessonsNav}>
                            {coursesSorted.map((c) => {
                                const navigateToCourse = () => {
                                    window.location.assign(`#${c._id}`);
                                };
                                return (
                                    <CoursePanelItem
                                        key={c._id}
                                        onClick={navigateToCourse}
                                        isActive={false}
                                    >
                                        {c.title}
                                    </CoursePanelItem>
                                );
                            })}
                        </nav>
                        <div className={s.lessonsScroll}>
                            {coursesSorted.map((course) => {
                                return (
                                    <CourseBlock
                                        key={course._id}
                                        course={course}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </MainBlockWrapper>
    );
}

function CourseBlock({ course }: { course: ICourse }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const courseBlockRef = useRef(null);

    const dragingLessonID = useRef<string>('');
    const dragingCourseID = useRef<string>('');

    const {
        userDetails: { lessonsDone, _id, lessonsOpen, isTeacher }
    } = useUserContext();
    const { courses, setCourses, normilizedLessons } = useLessonsContext();

    const { lessonsOrder } = course;

    const handleClick = (lesson: ILesson) => {
        navigate(`${PATHS.lesson}?lessonId=${lesson._id}&studentId=${_id}`, {
            state: lesson
        });
    };

    const dragStartHandler = (e) => {
        const lessonId = e.target.dataset.lessonId;
        const courseId = e.target.dataset.courseId;
        dragingLessonID.current = lessonId;
        dragingCourseID.current = courseId;
    };
    const dropHandler = (e) => {
        e.preventDefault();
        const { courseId, lessonId: dropedLessonId } = e.target.dataset;
        e.target.style.opacity = 1;

        if (dropedLessonId === dragingLessonID.current) {
            return;
        }

        if (courseId !== dragingCourseID.current) {
            addWNt('You cant change lessons between courses');
            return;
        }

        const thisCourse = courses.find((course) => course._id === courseId);
        if (!thisCourse) {
            console.error('No course after drop drgaging');
            return;
        }
        const { lessonsOrder } = thisCourse;

        const draggingLessonIndex = lessonsOrder.findIndex(
            (_id) => _id === dragingLessonID.current
        );
        const dropedLessonIndex = lessonsOrder.findIndex(
            (_id) => _id === dropedLessonId
        );

        const newLessonsOrder = [...lessonsOrder];
        newLessonsOrder.splice(draggingLessonIndex, 1, dropedLessonId);
        newLessonsOrder.splice(dropedLessonIndex, 1, dragingLessonID.current);

        const newLessonsOrderPayload = {
            _id: course._id,
            lessonsOrder: newLessonsOrder
        };

        setLoading(true);
        Backend.updateCourse(newLessonsOrderPayload)
            .then((newCourse) => {
                updateCourses(newCourse);
            })
            .finally(() => {
                setLoading(false);
            });

        const updateCourses = (newCourse: ICourse) =>
            setCourses((prev) => {
                return prev.map((course) => {
                    if (courseId === course._id) {
                        return newCourse;
                    }
                    return course;
                });
            });
    };
    const dragOverHandler = (e) => {
        e.preventDefault();
        const lessonId = e.target.dataset.lessonId;
        if (lessonId === dragingLessonID.current) {
            console.log(true);
            return;
        }

        e.target.style.opacity = 0.3;
    };
    const dragLeaveHandler = (e) => {
        e.preventDefault();
        e.target.style.opacity = 1;
    };

    return (
        <div
            ref={courseBlockRef}
            className={cls(s.lessonsBlock, {
                [s.lessonsBlockLoading]: loading
            })}
        >
            {loading && <CircleLoader isAbsolute inCenterOfBlock />}
            <CourseTitle course={course} />
            {lessonsOrder.map((lessonId) => {
                const lesson = normilizedLessons[lessonId];
                if (!lesson) {
                    return null;
                }

                const { _id } = lesson;
                const handleClickLesson = () => {
                    handleClick(lesson);
                };
                const isDone = lessonsDone.includes(_id);
                const isOpen = lessonsOpen.includes(_id) || isTeacher;
                const selectors: string[] = [s.square];
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
                        data-course-id={course._id}
                        data-lesson-id={lesson._id}
                        draggable={isTeacher}
                        onDragStart={dragStartHandler}
                        onDrop={dropHandler}
                        onDragOver={dragOverHandler}
                        onDragLeave={dragLeaveHandler}
                        key={lesson._id}
                        className={cls(s.lessonRoot, {
                            [s.lessonRootClickable]: isOpen
                        })}
                        onClick={isOpen ? handleClickLesson : () => {}}
                    >
                        <div className={cls(...selectors)}>
                            {isDone && <DoneIcon />}
                            {!isOpen && <LockIcon />}
                        </div>
                        <p className={s.lessonTitle} key={lesson._id}>
                            {lesson.title}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

function LockIcon() {
    return (
        <div className={s.lockSvg}>
            <LockSvg />
        </div>
    );
}

function DoneIcon() {
    return (
        <div className={s.doneSvg}>
            <DoneSvg />
        </div>
    );
}

function CourseTitle({ course: { title, _id } }: { course: ICourse }) {
    return (
        <div className={s.courseTitle} id={_id}>
            <div className={cls(s.courseTitleLine, s.courseTitleLeftLine)} />
            <span className={s.title}>{title}</span>
            <div className={cls(s.courseTitleLine, s.courseTitleRightLine)} />
        </div>
    );
}
