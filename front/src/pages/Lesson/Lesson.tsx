import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Chat } from '../../components/Chat/Chat';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { IHomework, ILesson } from '../../types/api';
import { myRequest } from '../../utils/axios';
import { addErrorNt } from '../../utils/notification';
import { PATHS } from '../../utils/paths';
import ModalImage from 'react-modal-image';
import s from './Lesson.module.css';

function Lesson() {
    const { state: lesson }: { state: ILesson } = useLocation();
    const [hws, setHws] = useState<IHomework[]>([]);

    useEffect(() => {
        if (!lesson) return;
        onReloadHomework();
    }, [lesson._id]);

    const onReloadHomework = () => {
        myRequest
            .get<any, IHomework[]>(`/homeworksByLessonId?id=${lesson._id}`)
            .then((homeworks) => {
                setHws(homeworks);
            })
            .catch(addErrorNt);
    };

    if (!lesson) {
        alert('No lesson');
        return <Navigate to={PATHS.lessons} replace={true} />;
    }

    return (
        <MainBlockWrapper title="Lesson" alignSecond="flex-start">
            <div className={s.root}>
                <h1>{lesson.title}</h1>
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
                    src={`https://www.youtube.com/embed/${lesson.link}?autoplay=1`}
                    frameBorder="0"
                    allowFullScreen
                />
                <div className={s.homework}>
                    <h3>Homework</h3>
                    <Chat lessonId={lesson._id} onReload={onReloadHomework} />
                    {hws.length !== 0 && (
                        <div className={s.homeworks}>
                            {hws.map((h: any) => {
                                return (
                                    <div key={h?._id} className={s.hw}>
                                        <p>{h?.content?.text}</p>
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
