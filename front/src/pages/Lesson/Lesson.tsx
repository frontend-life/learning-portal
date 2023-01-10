import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { IHomework, ILesson } from '../../types/api';
import { API_URLS, myRequest } from '../../utils/axios';
import { PATHS } from '../../utils/paths';
import s from './Lesson.module.css';
import { qp } from '../../utils/paths';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import { useLessonsContext } from '../../store/LessonsContext';
import { Chat } from '../../components/Chat/Chat';
import { getLang } from '../../utils/langs';
import { LessonView } from './LessonView';

interface Params {
    lessonId: string;
    studentId: string;
}

function Lesson() {
    const [loading, setLoading] = useState(true);
    const [homework, setHomework] = useState<IHomework>();

    const location = useLocation();
    const params = qp(location.search) as Partial<Params>;

    const { lessons } = useLessonsContext();

    const [lesson, setLesson] = useState<ILesson>();

    const nothingToDoHere = !params || !params?.lessonId || !params?.studentId;

    useEffect(() => {
        if (!params?.lessonId) {
            return;
        }
        const curLesson = lessons.find(({ _id }) => params.lessonId === _id);
        if (curLesson) {
            setLesson(curLesson);
            setLoading(false);
            getHomework();
            return;
        }
        if (!curLesson) {
            myRequest
                .get('/lesson', {
                    params: {
                        lessonId: params.lessonId
                    }
                })
                .then((l) => {
                    setLesson(l as unknown as ILesson);
                    setLoading(false);
                    getHomework();
                });
        }
    }, [lessons, params?.lessonId]);

    const handInHomework = () => {
        myRequest
            .post(API_URLS.HOMEWORK, {
                studentId: params.studentId,
                lessonId: params.lessonId
            } as IHomework)
            // @ts-ignore
            .then(({ homework }: { homework: IHomework }) => {
                setHomework(homework);
            });
    };

    const getHomework = () => {
        myRequest
            .get(API_URLS.HOMEWORK, {
                params: {
                    lessonId: params.lessonId,
                    studentId: params.studentId
                }
            })
            // @ts-ignore
            .then((response: IHomework[]) => {
                setHomework(response[0]);
            });
    };

    if (nothingToDoHere) {
        return <Navigate to={PATHS.lessons} replace={true} />;
    }

    if (loading || !lesson) {
        return <CircleLoader inCenterOfBlock />;
    }

    return (
        <MainBlockWrapper title="Lesson" alignSecond="flex-start">
            <div className={s.root}>
                <LessonView lesson={lesson} />
                <div className={s.homework}>
                    {lesson.homework && (
                        <>
                            <h3>Homework</h3>
                            <div
                                className={s.homeworkContent}
                                dangerouslySetInnerHTML={{
                                    __html: lesson.homework
                                }}
                            ></div>
                        </>
                    )}
                    {!homework?.chatId && (
                        <div
                            className={s.handInHomework}
                            onClick={handInHomework}
                        >
                            {getLang('start_homework_chat_button')}
                        </div>
                    )}
                    {homework?.chatId && (
                        <Chat chatId={homework.chatId} width={500} />
                    )}
                </div>
            </div>
        </MainBlockWrapper>
    );
}

export default Lesson;
