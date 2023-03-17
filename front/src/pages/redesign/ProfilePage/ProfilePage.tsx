import { Avatar } from 'src/components_v2/Avatar/Avatar';
import { CounterRating } from 'src/components_v2/CounterRating/CounterRating';
import { Text } from 'src/components_v2/Text/Text';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
    return (
        <div className={styles.root}>
            <Avatar />
            <Text size={24} className={styles.header}>
                NameFromTelegram
            </Text>
            <Text size={14} className={styles.subheader}>
                @Telegram: ____name____
            </Text>
            <CounterRating number={123456} className={styles.counter} />
        </div>
    );
};
