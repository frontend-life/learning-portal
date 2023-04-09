import { useUserContext } from '@store/UserDetails';
import { PATHS } from '@utils/paths';
import { useState } from 'react';
import { Avatar } from 'src/components_v2/Avatar/Avatar';
import { Button } from 'src/components_v2/Button/Button';
import { CounterRating } from 'src/components_v2/CounterRating/CounterRating';
import { Courses } from 'src/components_v2/Courses/Courses';
import { LessonListItem } from 'src/components_v2/LessonListItem/LessonListItem';
import { Line } from 'src/components_v2/Line/Line';
import { Text } from 'src/components_v2/Text/Text';
import { PageWrapper } from '../../../components_v2/PageWrapper/PageWrapper';

import styles from './ProfilePage.module.css';

const mock = [
    {
        id: 0,
        title: 'HTML'
    },
    {
        id: 1,
        title: 'CSS'
    },
    {
        id: 2,
        title: 'React'
    }
];

const lessonsMock = [
    {
        id: 'wefaergee4ge',
        courseId: 0,
        title: 'Lesson 1: HTML ewergaege'
    },
    {
        id: 'atebaetpaetmbae',
        courseId: 1,
        title: 'Lesson 1: CSS wrergergerg'
    },
    {
        id: 'wrgaer',
        courseId: 2,
        title: 'Lesson 1: React ergerg'
    }
];

export const ProfilePage = () => {
    const {
        userDetails: { 
            first_name, last_name, username
        }
    } = useUserContext();

    const logout = () => {
        localStorage.removeItem('authtoken');
        window.location.assign(PATHS.login);
    }
    const [currentCourse, setCurrentCoutse] = useState(mock[0]);
    const [c, setC] = useState(mock);
    const [l, setL] = useState(lessonsMock);

    return (
        <PageWrapper>
            <>
                <Avatar  />
                <Button text='выйти' onSubmit={logout}/>
                <Text size={24} className={styles.header}>
                    {`${first_name} ${last_name}`}
                </Text>
                <Text size={14} className={styles.subheader}>
                    {username}
                </Text>
                <CounterRating number={123456} className={styles.counter} />
                <Line className={styles.line} />
                <div className={styles.tasks}>
                    <div className={styles.currentTask}>
                        <Text size={14} className={styles.currentTaskText}>
                            Next task:
                        </Text>
                        <LessonListItem
                            status="important"
                            title="Test"
                            desc="Test"
                        />
                    </div>
                    <Line className={styles.line} width={'100%'} />
                    <div className={styles.doneTasks}>
                        <Text size={14} className={styles.currentTaskText}>
                            Tasks you done:
                        </Text>
                        <Courses
                            currentId={currentCourse.id}
                            courses={c}
                            onClick={(courseId) => {
                                setCurrentCoutse(
                                    // @ts-ignore
                                    c.find(({ id }) => id === courseId)
                                );
                            }}
                        />
                        <>
                            {lessonsMock
                                .filter((l) => {
                                    return l.courseId === currentCourse.id;
                                })
                                .map((l) => (
                                    <LessonListItem
                                        key={l.id}
                                        title={currentCourse.title}
                                        desc={l.title}
                                        status="closed"
                                        className={styles.doneLessons}
                                    />
                                ))}
                        </>
                    </div>
                </div>
            </>
        </PageWrapper>
    );
};
