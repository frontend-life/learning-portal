import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { IHomework, ILesson, Roles } from '../../types/api';
import { API_URLS, myRequest } from '../../utils/axios';
import { PATHS } from '../../utils/paths';
import s from './Lesson.module.css';
import { qp } from '../../utils/paths';
import { useUserContext } from '../../store/UserDetails';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import { useLessonsContext } from '../../store/LessonsContext';
import { Chat } from '../../components/Chat/Chat';
import { getLang } from '../../utils/langs';
import { DoneSign } from '../../components/DoneSign/DoneSign';

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
    const {
        userDetails: { roles, lessonsDone }
    } = useUserContext();

    const [lesson, setLesson] = useState<ILesson>();

    const navigate = useNavigate();

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

    const lessonDone = lessonsDone.includes(params?.lessonId as string);
    const isTeacher = roles.includes(Roles.TEACHER);

    const headerProps = isTeacher
        ? {
              style: { cursor: 'pointer' },
              onClick: () => {
                  navigate(PATHS.add_lesson, {
                      state: lesson
                  });
              }
          }
        : {};

    return (
        <MainBlockWrapper title="Lesson" alignSecond="flex-start">
            <div className={s.root}>
                {lessonDone && <DoneSign />}
                <h1 {...headerProps}>{lesson.title}</h1>
                <h3>Description</h3>
                <div
                    className={s.description}
                    dangerouslySetInnerHTML={{
                        __html: lesson.description
                    }}
                ></div>
                <iframe
                    title="lesson_from_youtube"
                    width="820"
                    height="515"
                    src={`https://www.youtube.com/embed/${lesson.link}?autoplay=0`}
                    frameBorder="0"
                    allowFullScreen
                />
                <div className={s.homework}>
                    <h3>Homework</h3>
                    <div
                        className={s.homeworkContent}
                        dangerouslySetInnerHTML={{
                            __html: lesson.homework
                        }}
                    ></div>
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
