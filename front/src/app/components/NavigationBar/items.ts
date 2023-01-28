import { PATHS } from '@utils/paths';

export const navigationItems: {
    path: typeof PATHS[keyof typeof PATHS];
    fontAwesomeIcon: string;
    isPublic?: boolean;
}[] = [
    {
        path: PATHS.profile,
        fontAwesomeIcon: 'fa-regular fa-user'
    },
    {
        path: PATHS.signup,
        isPublic: true,
        fontAwesomeIcon: 'fa-solid fa-user-plus'
    },
    {
        path: PATHS.signin,
        isPublic: true,
        fontAwesomeIcon: 'fa-solid fa-arrow-right-to-bracket'
    },
    {
        path: PATHS.lessons,
        fontAwesomeIcon: 'fa-solid fa-list-check'
    },
    {
        path: PATHS.add_lesson,
        fontAwesomeIcon: 'fa-solid fa-plus'
    },
    {
        path: PATHS.students,
        fontAwesomeIcon: 'fa-regular fa-address-book'
    },
    {
        path: PATHS.rating,
        fontAwesomeIcon: 'fa-solid fa-star'
    },
    // To prevent ploading big videos
    // {
    //     path: PATHS.screen_recorder,
    //     Element: ScreenRecorder,
    // fontAwesomeIcon: 'fa-solid fa-user-plus'

    // },
    {
        path: PATHS.logout,
        fontAwesomeIcon: 'fa-solid fa-person-running'
    }
];
