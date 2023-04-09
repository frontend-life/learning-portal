const lang = () => window.lang;

type Keys =
    | 'start_homework_chat_button'
    | 'my_profile'
    | 'no_connection_with_telegram'
    | 'you_are_connected_to_telegram'
    | 'link_to_telegram_bot'
    | 'my_salary'
    | 'show_approved'
    | 'check_video_link'
    | 'check_description_iframe'
    | 'login_greeting_title'
    | 'login_greeting_subtitle'
    | 'login_with_telegram'
    | 'login_switch_account'
    | 'logout_instruction_header'
    | 'logout_instruction_chat_p'
    | 'logout_instruction_message_p'
    | 'logout_instruction_back_to_login_p1'
    | 'logout_instruction_back_to_login_a'
    | 'logout_instruction_back_to_login_p2';
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
    },
    check_description_iframe: {
        ru: 'Проверить документ',
        eng: 'Check doc'
    },
    login_greeting_title: {
        ru: 'Привет!',
        eng: 'Hello!'
    },
    login_greeting_subtitle: {
        ru: 'С ВОЗВРАЩЕНИЕМ',
        eng: 'WELCOME BACK'
    },
    login_with_telegram: {
        ru: 'Войти через телеграм',
        eng: 'Login with telegram'
    },
    login_switch_account: {
        ru: 'Сменить аккаунт или выйти',
        eng: 'Switch account or sign out'
    },
    logout_instruction_header: {
        ru: 'Как завершить активную сессию',
        eng: 'How to terminate active session',
    },
    logout_instruction_chat_p: {
        ru: 'Перейдите в этот чат, в котором ранее одобряли авторизацию',
        eng: 'Go to this chat, where you previously approved the authorization'
    },
    logout_instruction_message_p: {
        ru: 'Вы найдете следующее сообщение с кнопкой "завершить сеанс"',
        eng: 'You will see the following message with "terminate session" button'
    },
    logout_instruction_back_to_login_p1: {
        ru: 'После завершения сеанса, вы можете',
        eng: 'After terminating the session you can '
    },
    logout_instruction_back_to_login_a: {
        ru: 'вернуться на страницу входа',
        eng: 'return to login page'
    },
    logout_instruction_back_to_login_p2: {
        ru: ' и авторизоваться под другим или тем же аккаунтом',
        eng: ' and sign in under different or same account'
    }
};

export const getLang = (key: Keys) => {
    return strings[key][lang()] || '--';
};
