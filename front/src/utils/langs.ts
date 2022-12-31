const lang = () => window.lang;

type Keys = 'start_homework_chat_button';
type LangsStrings = {
    [key in Keys]: {
        [key in ReturnType<typeof lang>]: string;
    };
};

const strings: LangsStrings = {
    start_homework_chat_button: {
        ru: 'Старт чата для сдачи домашки',
        eng: 'Start chat to hand in homework'
    }
};

export const getLang = (key: Keys) => {
    return strings[key][lang()] || '--';
};
