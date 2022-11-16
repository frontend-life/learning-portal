import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { ICourse, ILesson } from '../../types/api';
import { myRequest } from '../../utils/axios';
import { cls } from '../../utils/css';
import { DoneSvg } from './doneSvg';
import s from './Lessons.module.css';
import { LockSvg } from './lockSvg';

export function Lessons() {
    let navigate = useNavigate();
    const [lessons, setLessons] = useState<ILesson[]>([]);
    const [courses, setCourses] = useState<ICourse[]>([]);

    useEffect(() => {
        Promise.all([
            myRequest.get<any, ILesson[]>('/lesson/lessons'),
            myRequest.get<any, ICourse[]>('/course/courses')
        ]).then(([lessons, courses]) => {
            setLessons([...lessons, ...lessons, ...lessons]);
            console.log(lessons);
            setCourses(courses);
            console.log('courses', courses);
        });
    }, []);

    const handleClick = (lessonId: string) => {
        console.log('/lesson/' + lessonId);
        navigate('/lesson/' + lessonId);
    };

    return (
        <MainBlockWrapper title="Lessons">
            <div className="Lessons">
                {courses.map((c) => {
                    return (
                        <div key={c._id} className={s.courseTitle}>
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
                    );
                })}
                {lessons.map((lesson) => {
                    const selectors: string[] = [s.square];
                    if (lesson.isDone) {
                        selectors.push(s.done);
                    } else if (lesson.isClosed) {
                        selectors.push(s.closed);
                    } else if (lesson.isOpen) {
                        selectors.push(s.open);
                    }
                    return (
                        <div className={s.lessonRoot}>
                            <div
                                className={cls(...selectors)}
                                onClick={() => {
                                    handleClick(lesson._id);
                                }}
                            >
                                {lesson.isDone && (
                                    <div className={s.doneSvg}>
                                        <DoneSvg />
                                    </div>
                                )}
                                {lesson.isClosed && (
                                    <div className={s.lockSvg}>
                                        <LockSvg />
                                    </div>
                                )}
                            </div>
                            <p className={s.lessonTitle} key={lesson._id}>
                                {lesson.title}
                            </p>
                        </div>
                    );
                })}
            </div>
        </MainBlockWrapper>
    );
}
