import s from './UserCard.module.css';

export const UserCard = () => {
    return (
        <div className={s.root}>
            <div className={s.avatar}></div>
            <div className={s.text}>
                <div className={s.title}>Sergey Prilepko</div>

                <div className={s.salary}>$5000</div>

                <div className={s.telegram}>Telegram:</div>

                <div className={s.telegramNick}>@TheLABL</div>
            </div>
        </div>
    );
};
