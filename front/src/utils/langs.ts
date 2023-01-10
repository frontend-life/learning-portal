const lang = () => window.lang;

type Keys =
    | 'start_homework_chat_button'
    | 'my_profile'
    | 'no_connection_with_telegram'
    | 'you_are_connected_to_telegram'
    | 'link_to_telegram_bot'
    | 'my_salary'
    | 'show_approved'
    | 'check_video_link';
type LangsStrings = {
    [key in Keys]: {
        [key in ReturnType<typeof lang>]: string;
    };
};

const strings: LangsStrings = {
    start_homework_chat_button: {
        ru: 'Старт чата для сдачи домашки',
        eng: 'Start chat to hand in homework'
    },
    my_profile: {
        ru: 'Мой профиль',
        eng: 'My profile'
    },
    no_connection_with_telegram: {
        ru: 'Телеграм не подключен для уведомлений',
        eng: 'No connection with telegram for notifications'
    },
    you_are_connected_to_telegram: {
        ru: 'Вы подключены к телеграм боту для уведомлений',
        eng: 'You are connected to telegram bot for notifications'
    },
    link_to_telegram_bot: {
        ru: 'Ссылка на телеграм бот',
        eng: 'Link to telegram bot'
    },
    my_salary: {
        ru: 'Моя зарплата',
        eng: 'My salary is'
    },
    show_approved: {
        ru: 'Показать выполненные',
        eng: 'Show approved'
    },
    check_video_link: {
        ru: 'Проверить ссылку',
        eng: 'Check link'
    }
};

export const getLang = (key: Keys) => {
    return strings[key][lang()] || '--';
};
