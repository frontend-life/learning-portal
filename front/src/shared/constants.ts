import { Logout } from '@pages/Logout/Logout';
import { PATHS } from '@utils/paths';
import {
    AddLesson,
    Homeworks,
    Lesson,
    Lessons,
    LoginPage,
    ProfilePage,
    Rating,
    SignInPage,
    SignUpPage,
    Students,
    WelcomePage
} from '../pages';
import { ProfilePage as RedesignedProfilePage } from '../pages/redesign/ProfilePage/ProfilePage';
import { LessonPage as RedesignedLessonPage } from '../pages/redesign/LessonPage/LessonPage';

export const pages: {
    path: PATHS;
    Element: React.FC;
    isPublic?: boolean;
}[] = [
    {
        path: PATHS.profile,
        Element: ProfilePage
    },
    {
        path: PATHS.redesignedProfile,
        Element: RedesignedProfilePage
    },
    {
        path: PATHS.redesignedLesson,
        Element: RedesignedLessonPage
    },
    {
        path: PATHS.login,
        Element: LoginPage,
        isPublic: true
    },
    {
        path: PATHS.welcome,
        Element: WelcomePage,
        isPublic: true
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
        // @ts-ignore
        Element: Students
    },
    {
        path: PATHS.rating,
        Element: Rating
    },
    {
        path: PATHS.homeworks,
        Element: Homeworks
    },
    // To prevent ploading big videos
    // {
    //     path: PATHS.screen_recorder,
    //     Element: ScreenRecorder,
    // },
    {
        path: PATHS.logout,
        Element: Logout
    }
];
