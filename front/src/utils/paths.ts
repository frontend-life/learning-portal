export const PATHS = {
    profile: '/profile',
    about: '/about',
    signup: '/signup',
    signin: '/signin',
    lesson: '/lesson',
    lessons: '/lessons',
    add_lesson: '/add_lesson',
    tracks: '/tracks',
    rating: '/rating',
    students: '/students',
    homeworks: '/homeworks'
};

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
