import { getLang } from '@utils/langs';

import s from './TelegramConnectionPage.module.css';

export const TelegramConnectionPage = ({ userId }: { userId: number }) => {
    const reload = () => window.location.reload();
    return (
        <div className={s.root}>
            <h1>Надо подключиться к телеграм боту оповещений</h1>
            <h1>(посмотрите эту инструкцию)</h1>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/MN12SFHQAYY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
            <br></br>
            <br></br>
            <br></br>
            <a
                className={s.link}
                href="
https://t.me/FrontendPortalNotifications_bot"
                target="_blank"
            >
                {getLang('link_to_telegram_bot')}
            </a>
            <h2 className={s.id}>
                Telegram bot name: frontend-portal-notifications
            </h2>
            <h2 className={s.id}>Your id: {userId}</h2>
            <button onClick={reload}>Reload page</button>
        </div>
    );
};
