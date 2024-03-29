import { getBaseUrl } from './axios';

export enum PATHS {
    profile = '/profile',
    about = '/about',
    login = '/login',
    signup = '/signup',
    signin = '/signin',
    lesson = '/lesson',
    lessons = '/lessons',
    add_lesson = '/add_lesson',
    tracks = '/tracks',
    rating = '/rating',
    students = '/students',
    homeworks = '/homeworks',
    screen_recorder = '/screen_recorder',
    logout = '/logout',
    telegramConnectionPage = '/telegramConnectionPage',
    redesignedProfile = '/redesignedProfile',
    redesignedLesson = '/rLesson'
}

// url
export const qp = (queryString: string) => {
    if (!queryString) {
        return {};
    }
    return queryString
        ?.split('?')[1]
        ?.split('&')
        ?.reduce<Record<string, string>>((acc, pair) => {
            const [key, value] = pair?.split('=');
            acc[key] = value;
            return acc;
        }, {});
};

export const getAttachPath = (path: string) => {
    return `${getBaseUrl()}${path.split('/public')[1]}`;
};
