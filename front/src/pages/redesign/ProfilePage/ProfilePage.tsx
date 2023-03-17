import { Avatar } from 'src/components_v2/Avatar/Avatar';
import { CounterRating } from 'src/components_v2/CounterRating/CounterRating';
import { LessonListItem } from 'src/components_v2/LessonListItem/LessonListItem';
import { Line } from 'src/components_v2/Line/Line';
import { Text } from 'src/components_v2/Text/Text';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <Avatar />
                <Text size={24} className={styles.header}>
                    NameFromTelegram
                </Text>
                <Text size={14} className={styles.subheader}>
                    @Telegram: ____name____
                </Text>
                <CounterRating number={123456} className={styles.counter} />
                <Line className={styles.line} />
                <div className={styles.tasks}>
                    <div className={styles.currentTask}>
                        <Text size={14} className={styles.currentTaskText}>
                            Next task:
                        </Text>
                        <LessonListItem />
                    </div>
                </div>
            </div>
        </div>
    );
};
