import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chat } from '../../components/Chat/Chat';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import { HWDoneButton } from '../../components/HWDoneButton/HWDoneButton';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { API_URLS } from '../../utils/axios';
import { useGetArrayData } from '../../utils/hooks';
import { qp } from '../../utils/paths';
import { Homework } from '../Lesson/Homework';
import s from './Homeworks.module.css';

export const Homeworks = () => {
    const { loading, data } = useGetArrayData<any>(
        `${API_URLS.HOMEWORK}?populate[lessonId]=1&populate[studentId]=1`
    );
    console.log(data);
    const renderContent = () => {
        return (
            <div className={s.root}>
                <div className={s.homeworksColumn}>
                    <HomeworksList loading={loading} data={data} />
                </div>
                <div className={s.viewColumn}>
                    <HomeworkView data={data} />
                </div>
            </div>
        );
    };

    return (
        <MainBlockWrapper>
            {loading && <CircleLoader inCenterOfBlock />}
            {!loading && renderContent()}
        </MainBlockWrapper>
    );
};

type HomeworkItem = {
    id: number;
    user: string;
    lesson: string;
};

function HomeworksList({ loading, data }) {
    const navigate = useNavigate();
    const [userSearch, setUserSearch] = useState('');
    const [lessonSearch, setLessonSearch] = useState('');

    const homeworks: Array<HomeworkItem> = useMemo(() => {
        if (!data) return [];

        let result: any = data;

        if (lessonSearch && userSearch) {
            result = result.filter(({ lessonId, studentId }) => {
                const lOk = lessonId.title
                    .toLowerCase()
                    .includes(lessonSearch.toLowerCase());
                const sOk = studentId.name
                    .toLowerCase()
                    .includes(userSearch.toLowerCase());
                if (lOk && sOk) {
                    return true;
                }
                return false;
            });
        }

        if (lessonSearch) {
            result = result.filter(({ lessonId }) => {
                const lOk = lessonId.title
                    .toLowerCase()
                    .includes(lessonSearch.toLowerCase());
                if (lOk) {
                    return true;
                }
                return false;
            });
        }

        if (userSearch) {
            result = result.filter(({ studentId }) => {
                const sOk = studentId.name
                    .toLowerCase()
                    .includes(userSearch.toLowerCase());
                if (sOk) {
                    return true;
                }
                return false;
            });
        }

        result = result.map(({ _id, lessonId, studentId }) => {
            return {
                id: _id,
                user: studentId.name,
                lesson: lessonId.title
            };
        });

        return result;
    }, [data, userSearch, lessonSearch]);

    const renderSearch = () => {
        return (
            <div className={s.search}>
                <input
                    className={s.searchInput}
                    placeholder="Search by user name"
                    onChange={(e) => setUserSearch(e.target.value)}
                />
                <input
                    className={s.searchInput}
                    placeholder="Search by lesson name"
                    onChange={(e) => setLessonSearch(e.target.value)}
                />
            </div>
        );
    };

    const renderList = () => {
        return (
            <>
                {homeworks.map((homework) => {
                    const { id, lesson, user } = homework;
                    return (
                        <div
                            key={id}
                            className={s.homeworkItem}
                            onClick={() => {
                                navigate(
                                    `/homeworks?homeworkId=${id}&userName=${user}`
                                );
                            }}
                        >
                            <h3>{user}</h3>
                            <p>{lesson}</p>
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <>
            {renderSearch()}
            <div className={s.homeworksList}>
                {loading ? <CircleLoader inCenterOfBlock /> : renderList()}
            </div>
        </>
    );
}

// interface Props {
//     lessonId: number;
//     studenId: number;
// }
function HomeworkView({ data }) {
    const location = useLocation();
    const { homeworkId, userName } = qp(location.search);

    if (!homeworkId || !userName) {
        return null;
    }

    const currentHomework = data.find(({ _id, studentId }) => {
        return _id === homeworkId && studentId.name === userName;
    });

    if (!currentHomework) {
        return <h1>I don't know why, no such homework</h1>;
    }

    return (
        <>
            <div className={s.lessonColumn}>
                <LessonView lesson={currentHomework.lessonId} />
            </div>
            <div className={s.chatColumn}>
                <ChatView homework={currentHomework} />
            </div>
        </>
    );
}

function LessonView({ lesson }) {
    return (
        <>
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
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${lesson.link}?autoplay=0`}
                frameBorder="0"
                allowFullScreen
            />
            <h3>Homework</h3>
            <div
                dangerouslySetInnerHTML={{
                    __html: lesson.homework
                }}
            ></div>
        </>
    );
}
function ChatView({ homework }) {
    const { chatId, lessonId, studentId } = homework;
    return (
        <>
            <Chat chatId={chatId} width={300} />
            <HWDoneButton lessonId={lessonId} studentId={studentId} />
        </>
    );
}
