import { PATHS } from '@utils/paths';
import {
    AddLesson,
    Homeworks,
    Lesson,
    Lessons,
    ProfilePage,
    Rating,
    SignInPage,
    SignUpPage,
    Students
} from '../pages';

export const pages = [
    {
        path: PATHS.profile,
        Element: ProfilePage
    },
    {
        path: PATHS.signup,
        Element: SignUpPage,
        isPublic: true
    },
    {
        path: PATHS.signin,
        Element: SignInPage,
        isPublic: true
    },
    {
        path: PATHS.lesson,
        Element: Lesson
    },
    {
        path: PATHS.lessons,
        Element: Lessons
    },
    {
        path: PATHS.add_lesson,
        Element: AddLesson
    },
    {
        path: PATHS.students,
        Element: Students
    },
    {
        path: PATHS.rating,
        Element: Rating
    },
    {
        path: PATHS.homeworks,
        Element: Homeworks
    }
    // To prevent ploading big videos
    // {
    //     path: PATHS.screen_recorder,
    //     Element: ScreenRecorder
    // }
];
