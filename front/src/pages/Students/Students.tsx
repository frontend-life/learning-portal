import { useMemo, useState } from 'react';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import { wrap } from '../../components/MainBlockWrapper/MainBlockWrapper';
import { Switch } from '../../components/Switch/Switch';
import { ICourse, ILesson, IUser } from '../../types/api';
import { API_ROUTES, myRequest } from '../../utils/axios';
import { cls } from '../../utils/css';
import { useDebounceUsersSearch, useGetArrayData } from '../../utils/hooks';

import { lockSvg as LockSVG } from './lock';
import { unlockSvg as UnlockSVG } from './unlock';
import { checkSvg as CheckSVG } from './check';
import { uncheckSvg as UncheckSVG } from './uncheck';

import s from './Students.module.css';
import { useLessonsContext } from '../../store/LessonsContext';

export const Students = wrap(() => {
    const [chosenUser, setChosenUser] = useState<IUser>();
    const [chosenCourse, setChosenCourse] = useState<ICourse>();
    const [search, setSearch] = useState<string>('');
    const { data, setData, loading, loadingBySearch } =
        useDebounceUsersSearch(search);
    const {
        courses,
        lessons,
        normilizedLessons,
        loadingStatus: loadingLessons
    } = useLessonsContext();

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

    const openAllCourse = () => {
        // setLoadingAllCourseUpdate true
        myRequest
            .post<any, IUser>(API_ROUTES.OPEN_COURSE, {
                courseId: chosenCourse?._id,
                userId: chosenUser?._id
            })
            .then((user) => {
                console.log(user);
                setChosenUser(user);
            })
            .finally(() => {
                // setLoadingAllCourseUpdate false
            });
    };

    const closeAllCourse = () => {
        // setLoadingAllCourseUpdate true
        myRequest
            .post<any, IUser>(API_ROUTES.CLOSE_COURSE, {
                courseId: chosenCourse?._id,
                userId: chosenUser?._id
            })
            .then((user) => {
                console.log(user);
                setChosenUser(user);
            })
            .finally(() => {
                // setLoadingAllCourseUpdate false
            });
    };

    const isCourseAllOpened = useMemo(() => {
        if (!chosenCourse?.lessonsOrder.length) {
            return;
        }
        if (!chosenUser?.lessonsOpen.length) {
            return;
        }
        for (let i = 0; i < chosenCourse.lessonsOrder.length; i++) {
            const lessonId = chosenCourse.lessonsOrder[i];
            if (!chosenUser.lessonsOpen.includes(lessonId)) {
                return false;
            }
        }
        return true;
    }, [chosenCourse, chosenUser]);

    if (loading || loadingLessons) {
        return <CircleLoader />;
    }

    return (
        <div className={s.root}>
            <div className={s.sidebar}>
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.currentTarget.value);
                    }}
                    className={s.search}
                    placeholder="Type to search users"
                />
                <div className={s.searchContent}>
                    {chosenUser?.name && (
                        <div>
                            <p>Chosen user</p>
                            <h1 className={s.userName}>
                                {
                                    <div
                                        key={chosenUser?._id + chosenUser?.name}
                                        className={`${s.user} ${s.userActive}`}
                                    >
                                        {chosenUser?.name}
                                    </div>
                                }
                            </h1>
                            <hr />
                        </div>
                    )}
                    {loadingBySearch && <CircleLoader inCenterOfBlock />}
                    {!loadingBySearch && data.length === 0 && <p>No users</p>}
                    {!loadingBySearch &&
                        data &&
                        data?.map((user) => {
                            const { name, _id } = user;
                            return (
                                <div
                                    key={_id}
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
            </div>
            <div className={s.lessons}>
                {chosenUser && (
                    <div className={s.coursePanel}>
                        {courses
                            .sort((a, b) => a.order - b.order)
                            .map((course) => {
                                const { title, _id } = course;
                                const onClick = () => setChosenCourse(course);
                                const isActive = chosenCourse?._id === _id;
                                return (
                                    <div
                                        key={_id}
                                        className={cls(s.coursePanelItem, {
                                            [s.coursePanelItemActive]: isActive
                                        })}
                                        onClick={onClick}
                                    >
                                        {title}
                                    </div>
                                );
                            })}
                    </div>
                )}
                {chosenCourse && (
                    <div
                        className={s.openAllCourse}
                        onClick={
                            isCourseAllOpened ? closeAllCourse : openAllCourse
                        }
                    >
                        <h4>
                            Открыть весь курс "{chosenCourse.title}" студенту
                        </h4>
                        <div className={s.switch}>
                            <Switch defaultCheck={isCourseAllOpened} />
                        </div>
                    </div>
                )}
                <div className={s.lessonCards}>
                    {chosenCourse &&
                        chosenCourse.lessonsOrder.map((lessonId) => {
                            const l = normilizedLessons[lessonId];
                            const isDone =
                                chosenUser?.lessonsDone.includes(l._id) ||
                                false;
                            const isOpen =
                                chosenUser?.lessonsOpen.includes(l._id) ||
                                false;
                            return (
                                <div className={s.lessonCard} key={l._id}>
                                    <h4
                                        className={s.lessonTitle}
                                        title={l.title}
                                    >
                                        {l.title}
                                    </h4>

                                    <div className={s.statuses}>
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
                                            <span className={s.switchText}>
                                                Closed
                                                <LockSVG />
                                            </span>
                                            <div className={s.switch}>
                                                <Switch defaultCheck={isOpen} />
                                            </div>
                                            <span className={s.switchText}>
                                                Open
                                                <UnlockSVG />
                                            </span>
                                        </div>

                                        <div
                                            className={cls(s.status, {
                                                [s.isDone]: isDone,
                                                [s.isNotDone]: !isDone
                                            })}
                                            onClick={() => {
                                                isDone
                                                    ? handleNotDone(l)
                                                    : handleDone(l);
                                            }}
                                        >
                                            <span className={s.switchText}>
                                                Not done
                                                <UncheckSVG />
                                            </span>
                                            <div className={s.switch}>
                                                <Switch defaultCheck={isDone} />
                                            </div>
                                            <span className={s.switchText}>
                                                Done
                                                <CheckSVG />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}, 'Students');
