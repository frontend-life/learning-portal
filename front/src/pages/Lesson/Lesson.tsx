import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Chat } from '../../components/Chat/Chat';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { IHomework, ILesson, Roles } from '../../types/api';
import { myRequest } from '../../utils/axios';
import { addErrorNt } from '../../utils/notification';
import { PATHS } from '../../utils/paths';
import ModalImage from 'react-modal-image';
import s from './Lesson.module.css';
import { qp } from '../../utils/paths';
import { useUserContext } from '../../store/UserDetails';
import { LoadingAnimation } from '../../components/LoadingAnimation/LoadingAnimation';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import { useLessonsContext } from '../../store/LessonsContext';
import { HWDoneButton } from '../../components/HWDoneButton/HWDoneButton';

interface Params {
    lessonId: string;
    studentId: string;
}
const onReloadHomework = (setHws: any, params: Params) => {
    myRequest
        .get<any, IHomework[]>(
            `/homeworksByLessonId?lessonId=${params.lessonId}&studentId=${params?.studentId}`
        )
        .then((homeworks) => {
            setHws(homeworks);
        })
        .catch(addErrorNt);
};

function Lesson() {
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const params = qp(location.search) as Partial<Params>;

    const { lessons } = useLessonsContext();
    const {
        userDetails: { roles, lessonsDone }
    } = useUserContext();
    console.log('lessonsDone', lessonsDone);
    const [lesson, setLesson] = useState<ILesson>();

    const [hws, setHws] = useState<IHomework[]>([]);
    const navigate = useNavigate();

    const nothingToDoHere = !params || !params?.lessonId || !params?.studentId;

    useEffect(() => {
        if (!params?.lessonId) {
            return;
        }
        const lesson = lessons.find(({ _id }) => params.lessonId === _id);
        if (lesson) {
            setLesson(lesson);
            setLoading(false);

            return;
        }
        if (!lesson) {
            myRequest
                .get('/lesson', {
                    params: {
                        lessonId: params.lessonId
                    }
                })
                .then((l) => {
                    setLesson(l as unknown as ILesson);
                    setLoading(false);
                });
        }
    }, [lessons, params?.lessonId]);

    const reloadHW = useCallback(() => {
        onReloadHomework(setHws, params as Params);
    }, [setHws, params]);

    const handleApproveHomework = () => {
        if (!params?.studentId) {
            return;
        }
        myRequest
            .post('/user/done', {
                lessonId: params.lessonId,
                userId: params.studentId
            })
            .then(reloadHW);
    };

    useEffect(() => {
        if (loading || nothingToDoHere) return;
        reloadHW();
    }, [loading, nothingToDoHere]);

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
                        dangerouslySetInnerHTML={{
                            __html: lesson.homework
                        }}
                    ></div>
                    {isTeacher ? (
                        <HWDoneButton onClick={handleApproveHomework} />
                    ) : (
                        lessonDone && <HWDoneButton />
                    )}
                    {!lessonDone && (
                        <Chat lessonId={lesson._id} onReload={reloadHW} />
                    )}
                    {hws.length !== 0 && (
                        <div className={s.homeworks}>
                            {hws.map((h: any) => {
                                return (
                                    <div key={h?._id} className={s.hw}>
                                        <pre>
                                            <code>{h?.content?.text}</code>
                                        </pre>
                                        {h?.content?.attachments.map((att) => {
                                            const url = `http://localhost:8000/${
                                                att.path.split('public')[1]
                                            }`;
                                            return (
                                                <div
                                                    key={att._id}
                                                    className={s.hw_img}
                                                >
                                                    <ModalImage
                                                        small={url}
                                                        large={url}
                                                        alt="Here should be a homework image, but it is gone:)"
                                                    />
                                                </div>
                                            );
                                        })}
                                        <div className={s.hwTime}>
                                            Created at (greenwich time):{' '}
                                            {new Date(
                                                h?.createdAt
                                            ).toISOString()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </MainBlockWrapper>
    );
}

export default Lesson;
