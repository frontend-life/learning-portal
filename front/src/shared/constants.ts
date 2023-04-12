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
    LogoutInstruction
} from '../pages';
import { ProfilePage as RedesignedProfilePage } from '../pages/redesign/ProfilePage/ProfilePage';
import { LessonPage as RedesignedLessonPage } from '../pages/redesign/LessonPage/LessonPage';
import { AddLesson as RedesignedAddLessonPage } from '../pages/redesign/AddLesson/AddLesson';

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
        Element: RedesignedProfilePage,
        isPublic: true
    },
    {
        path: PATHS.redesignedLesson,
        Element: RedesignedLessonPage,
        isPublic: true
    },
    {
        path: PATHS.redesignedAddLesson,
        Element: RedesignedAddLessonPage,
        isPublic: true
    },
    {
        path: PATHS.login,
        Element: LoginPage,
        isPublic: true
    },
    {
        path: PATHS.logoutInstruction,
        Element: LogoutInstruction,
        isPublic: true
    },
    {
        path: PATHS.signup,
        Element: SignUpPage,
        //isPublic: true
    },
    {
        path: PATHS.signin,
        Element: SignInPage,
        //isPublic: true
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
