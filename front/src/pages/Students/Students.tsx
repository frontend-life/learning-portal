import { useEffect, useState } from 'react';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import { wrap } from '../../components/MainBlockWrapper/MainBlockWrapper';
import { ILesson, IUser } from '../../types/api';
import { myRequest } from '../../utils/axios';
import { cls } from '../../utils/css';
import { useGetArrayData } from '../../utils/hooks';
import s from './Students.module.css';

export const Students = wrap(() => {
    const [chosenUser, setChosenUser] = useState<IUser>();
    const [search, setSearch] = useState<string>('');
    const { data, loading, setData } = useGetArrayData<IUser[]>('/user/users');
    const { data: lessons, loading: loadingLessons } =
        useGetArrayData<ILesson[]>('/lesson/lessons');

    const handleOpen = (lesson: ILesson) => {
        if (!chosenUser) {
            return;
        }
        myRequest
            .post('/user/open', {
                userId: chosenUser._id,
                lessonId: lesson._id
            })
            .then(() => {
                setChosenUser((prev) => {
                    if (!prev) {
                        return;
                    }
                    return {
                        ...prev,
                        lessonsOpen: [...prev.lessonsOpen, lesson._id]
                    } as IUser;
                });
                setData((prev) => {
                    if (!prev) {
                        return;
                    }
                    return prev.map((u) => {
                        if (u._id === chosenUser._id) {
                            return {
                                ...u,
                                lessonsOpen: [
                                    ...chosenUser.lessonsOpen,
                                    lesson._id
                                ]
                            } as IUser;
                        } else {
                            return u;
                        }
                    });
                });
            });
    };
    const handleClose = (lesson: ILesson) => {
        if (!chosenUser) {
            return;
        }
        myRequest
            .post('/user/close', {
                userId: chosenUser._id,
                lessonId: lesson._id
            })
            .then(() => {
                setChosenUser(
                    (prev) =>
                        ({
                            ...prev,
                            lessonsOpen: chosenUser.lessonsOpen.filter(
                                (lId) => lId !== lesson._id
                            )
                        } as IUser)
                );
                setData((prev) => {
                    if (!prev) {
                        return;
                    }
                    return prev.map((u) => {
                        if (u._id === chosenUser._id) {
                            return {
                                ...u,
                                lessonsOpen: u.lessonsOpen.filter(
                                    (lId) => lId !== lesson._id
                                )
                            } as IUser;
                        } else {
                            return u;
                        }
                    });
                });
            });
    };
    const handleDone = (lesson: ILesson) => {
        if (!chosenUser) {
            return;
        }
        myRequest
            .post('/user/done', {
                userId: chosenUser._id,
                lessonId: lesson._id
            })
            .then(() => {
                setChosenUser((prev) => {
                    if (!prev) {
                        return;
                    }
                    return {
                        ...prev,
                        lessonsDone: [...prev.lessonsDone, lesson._id]
                    } as IUser;
                });
                setData((prev) => {
                    if (!prev) {
                        return;
                    }
                    return prev.map((u) => {
                        if (u._id === chosenUser._id) {
                            return {
                                ...u,
                                lessonsDone: [
                                    ...chosenUser.lessonsDone,
                                    lesson._id
                                ]
                            } as IUser;
                        } else {
                            return u;
                        }
                    });
                });
            });
    };
    const handleNotDone = (lesson: ILesson) => {
        if (!chosenUser) {
            return;
        }
        myRequest
            .post('/user/notdone', {
                userId: chosenUser._id,
                lessonId: lesson._id
            })
            .then(() => {
                setChosenUser(
                    (prev) =>
                        ({
                            ...prev,
                            lessonsDone: chosenUser.lessonsDone.filter(
                                (lId) => lId !== lesson._id
                            )
                        } as IUser)
                );
                setData((prev) => {
                    if (!prev) {
                        return;
                    }
                    return prev.map((u) => {
                        if (u._id === chosenUser._id) {
                            return {
                                ...u,
                                lessonsDone: u.lessonsDone.filter(
                                    (lId) => lId !== lesson._id
                                )
                            } as IUser;
                        } else {
                            return u;
                        }
                    });
                });
            });
    };

    if (loading || loadingLessons) {
        return <CircleLoader />;
    }

    return (
        <div className={s.root}>
            <div className={s.sidebar}>
                <div
                    contentEditable
                    className={s.search}
                    placeholder="In dev"
                ></div>
                {data &&
                    data.map((user) => {
                        const { name } = user;
                        return (
                            <div
                                className={s.user}
                                onClick={() => {
                                    setChosenUser(user);
                                }}
                            >
                                {name}
                            </div>
                        );
                    })}
            </div>
            <div className={s.lessons}>
                <h1 className={s.userName}>
                    {chosenUser?.name || 'Chose user'}
                </h1>
                <div className={s.rows}>
                    {chosenUser &&
                        lessons?.map((l) => {
                            const isDone =
                                chosenUser?.lessonsDone.includes(l._id) ||
                                false;
                            const isOpen =
                                chosenUser?.lessonsOpen.includes(l._id) ||
                                false;
                            return (
                                <div className={s.row}>
                                    {l.title}

                                    <div
                                        className={cls(s.status, {
                                            [s.isOpen]: isOpen,
                                            [s.isClosed]: !isOpen
                                        })}
                                        onClick={() =>
                                            isOpen
                                                ? handleClose(l)
                                                : handleOpen(l)
                                        }
                                    >
                                        {isOpen ? (
                                            <span>Open</span>
                                        ) : (
                                            <span>Closed</span>
                                        )}
                                    </div>

                                    <div
                                        className={cls(s.status, {
                                            [s.isDone]: isDone,
                                            [s.isNotDone]: !isDone
                                        })}
                                        onClick={() =>
                                            isDone
                                                ? handleNotDone(l)
                                                : handleDone(l)
                                        }
                                    >
                                        {isDone ? (
                                            <span>Done</span>
                                        ) : (
                                            <span>Not done</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}, 'Students');
