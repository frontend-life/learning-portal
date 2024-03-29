import { useMemo, useState } from 'react';
import { CircleLoader } from '@components/CircleLoader/CircleLoader';
import { wrap } from '@components/MainBlockWrapper/MainBlockWrapper';
import { Switch } from '@components/Switch/Switch';
import { ICourse, ILesson, IUser } from '@type/api';
import { cls } from '@utils/css';
import { useDebounceUsersSearch } from '@utils/hooks';
import { useLessonsContext } from '@store/LessonsContext';

import s from './Students.module.css';

import { OpenCloseLessonCard } from './components/OpenCloseLessonCard/OpenCloseLessonCard';
import { Backend } from '@shared/Backend';
import { CoursePanelItem } from '@components/CoursePanelItem/CoursePanelItem';

export const Students = wrap(() => {
    const [chosenUser, setChosenUser] = useState<IUser>();
    const [chosenCourse, setChosenCourse] = useState<ICourse>();
    const [search, setSearch] = useState<string>('');
    const { data, setData, loading } = useDebounceUsersSearch(search);
    const [loadingAllCourseUpdate, setLoadingAllCourseUpdate] = useState(false);
    const {
        courses,
        normilizedLessons,
        loadingStatus: loadingLessons
    } = useLessonsContext();

    const handleOpen = (lesson: ILesson) => {
        if (!chosenUser) {
            return Promise.resolve();
        }
        return Backend.userLessonOpen({
            userId: chosenUser._id,
            lessonId: lesson._id
        }).then(() => {
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
                            lessonsOpen: [...chosenUser.lessonsOpen, lesson._id]
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
            return Promise.resolve();
        }
        return Backend.userLessonClose({
            userId: chosenUser._id,
            lessonId: lesson._id
        }).then(() => {
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
            return Promise.resolve();
        }
        return Backend.userLessonDone({
            userId: chosenUser._id,
            lessonId: lesson._id
        }).then(() => {
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
                            lessonsDone: [...chosenUser.lessonsDone, lesson._id]
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
            return Promise.resolve();
        }
        return Backend.userLessonNotDone({
            userId: chosenUser._id,
            lessonId: lesson._id
        }).then(() => {
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
        if (loadingAllCourseUpdate || !chosenCourse?._id || !chosenUser?._id) {
            return;
        }
        setLoadingAllCourseUpdate(true);
        return Backend.openAllCourse({
            courseId: chosenCourse._id,
            userId: chosenUser._id
        })
            .then((user) => {
                console.log(user);
                setChosenUser(user);
            })
            .finally(() => {
                setLoadingAllCourseUpdate(false);
            });
    };

    const closeAllCourse = () => {
        if (loadingAllCourseUpdate || !chosenCourse?._id || !chosenUser?._id) {
            return;
        }
        setLoadingAllCourseUpdate(true);
        Backend.closeAllCourse({
            courseId: chosenCourse?._id,
            userId: chosenUser?._id
        })
            .then((user) => {
                console.log(user);
                setChosenUser(user);
            })
            .finally(() => {
                setLoadingAllCourseUpdate(false);
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
                    {loading && <CircleLoader inCenterOfBlock />}
                    {!loading && data.length === 0 && <p>No users</p>}
                    {!loading &&
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
                                    <CoursePanelItem
                                        key={_id}
                                        onClick={onClick}
                                        isActive={isActive}
                                    >
                                        {title}
                                    </CoursePanelItem>
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
                            <Switch
                                defaultCheck={isCourseAllOpened}
                                disabled={loadingAllCourseUpdate}
                            />
                        </div>
                    </div>
                )}
                <div className={s.lessonCards}>
                    {chosenCourse &&
                        chosenCourse.lessonsOrder.map((lessonId) => {
                            const lesson = normilizedLessons[lessonId];
                            const isDone =
                                chosenUser?.lessonsDone.includes(lesson._id) ||
                                false;
                            const isOpen =
                                chosenUser?.lessonsOpen.includes(lesson._id) ||
                                false;

                            return (
                                <OpenCloseLessonCard
                                    key={lessonId}
                                    lesson={lesson}
                                    isOpen={isOpen}
                                    isDone={isDone}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    onDone={handleDone}
                                    onNotDone={handleNotDone}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}, 'Students');
