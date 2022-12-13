
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

import { ErrorBoundary } from './utils/ErrorBoundary';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import Lesson from './pages/Lesson/Lesson';
import { useUserContext } from './store/UserDetails';
import { PATHS } from './utils/paths';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { Lessons } from './pages/Lessons/Lessons';
import { Students } from './pages/Students/Students';
import { NotificationSystem } from './components/NotificationSystem/NotificationSystem';
import { useServerEvents } from './utils/hooks';
import { Rating } from './pages/Rating/Rating';
import { AddLesson } from './pages/AddLesson/AddLesson';

const urls = [
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
    }
];

const showNav = process.env.NODE_ENV === 'development' && true;

function App() {
    useServerEvents();
    return (
        <div className="App">
            <BrowserRouter>
                {showNav && (
                    <nav className="NavBar">
                        {urls.map(({ path }) => {
                            return (
                                <Link
                                    key={path}
                                    className="NavBar__li"
                                    to={path}
                                >
                                    {path}
                                </Link>
                            );
                        })}
                    </nav>
                )}
                <div style={{ height: '100vh', overflow: 'auto', flex: 1 }}>
                    <ErrorBoundary>
                        <AuthenticatedRoutes />
                        <NotificationSystem />
                    </ErrorBoundary>
                </div>
            </BrowserRouter>
        </div>
    );
}

function AuthenticatedRoutes() {
    const user = useUserContext();
    // const isTeacher = user.userDetails.roles.includes(Roles.TEACHER);

    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={<Navigate to={PATHS.signin} replace={true} />}
                />
                {urls.map(({ path, Element, isPublic }) => {
                    if (isPublic) {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Element />}
                            />
                        );
                    }
                    if (!user.userDetails.isSignedIn) {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <Navigate
                                        to={PATHS.signin}
                                        replace={true}
                                    />
                                }
                            />
                        );
                    }
                    return (
                        <Route key={path} path={path} element={<Element />} />
                    );
                })}
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Route>
        </Routes>
    );
}

export default App;
