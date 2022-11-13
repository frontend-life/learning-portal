import { Button, TextField, Typography, Box } from '@mui/material';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
    Navigate
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './App.css';
import { ILesson, ICourse } from './types/api';
import { myRequest } from './utils/axios';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import Lesson from './pages/Lesson/Lesson';
import { AddLesson } from './pages/AddLesson/AddLesson';
import { useEffect, useState } from 'react';
import { useUserContext } from './store/UserDetails';
import { PATHS } from './utils/paths';
import { LoadingAnimation } from './components/LoadingAnimation/LoadingAnimation';
import { LogoutButton } from './components/LogoutButton/LogoutButton';
import { getToken } from './utils/auth';

const urls = [
    {
        path: PATHS.dashboard,
        Element: Dashboard
    },
    {
        path: PATHS.about,
        Element: AboutPage
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
    }
    // { /* Courses for future*/
    //     path: PATHS.courses,
    //     Element: TracksPage
    // }
];

function App() {
    const user = useUserContext();
    const [startAnimation, setStartAnimation] = useState(true);
    if (startAnimation) {
        if (!user.userDetails.isSignedIn && getToken()) {
            user.setUserDetails((prev) => ({ ...prev, isSignedIn: true }));
            return null;
        }
        return (
            <LoadingAnimation
                onEnd={() => {
                    setStartAnimation(false);
                }}
            />
        );
    }
    return (
        <div className="App">
            <BrowserRouter>
                <nav className="NavBar">
                    {urls.map(({ path }) => {
                        return (
                            <Link key={path} className="NavBar__li" to={path}>
                                {path}
                            </Link>
                        );
                    })}
                </nav>
                <div style={{ height: '100vh', overflow: 'auto', flex: 1 }}>
                    <ErrorBoundary>
                        <AuthenticatedRoutes />
                        <LogoutButton />
                    </ErrorBoundary>
                </div>
            </BrowserRouter>
        </div>
    );
}

function AuthenticatedRoutes() {
    const user = useUserContext();

    return (
        <Routes>
            <Route path="/">
                <Route index element={<Landing />} />
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

function Landing() {
    return <h1>Landing for everyone</h1>;
}
function AboutPage() {
    return <h1>AboutPage</h1>;
}
function Dashboard() {
    return <h1>Dashboard</h1>;
}

function Lessons() {
    let navigate = useNavigate();
    const [lessons, setLessons] = useState<ILesson[]>([]);
    useEffect(() => {
        myRequest.get<any, ILesson[]>('/lesson').then((data) => {
            setLessons(data);
            console.log(data);
        });
    }, []);

    const handleClick = (lessonId: string) => {
        console.log('/lesson/' + lessonId);
        navigate('/lesson/' + lessonId);
    };

    return (
        <div className="Lessons">
            {lessons.map((lesson) => {
                return (
                    <div
                        className="Lesson__item"
                        onClick={() => {
                            handleClick(lesson._id);
                        }}
                    >
                        <div className="Lesson__itemImage">
                            Здесь будет картинка урока
                        </div>
                        <p className="Lesson__title" key={lesson._id}>
                            {lesson.title}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

function TracksPage() {
    const [tracks, setTracks] = useState<ICourse[]>([]);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        myRequest.post('/track', data).then((result: any) => {
            const newTrack: ICourse = {
                ...data,
                _id: result.insertedId
            };
            setTracks((prev) => [...prev, newTrack]);
        });
    };

    useEffect(() => {
        myRequest.get('/track').then((data) => {
            setTracks(data as unknown as ICourse[]);
        });
    }, []);

    return (
        <div>
            <Typography variant="h1" gutterBottom textAlign="center">
                Tracks
            </Typography>
            {tracks.map((track) => {
                return <TrackRaw key={track._id} track={track} />;
            })}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Track title"
                    {...register('track_name')}
                    required
                />
                <Button type="submit" variant="contained">
                    Add track
                </Button>
            </Box>
        </div>
    );
}

function TrackRaw({ track }: { track: ICourse }) {
    const [trackData, setTrackData] = useState(track);
    const [isEditing, setIsEditing] = useState(false);
    if (isEditing) {
        return (
            <TrackEdit
                track={trackData}
                onCloseEditing={(data) => {
                    setIsEditing(false);
                    setTrackData(data);
                }}
            />
        );
    }
    return (
        <h3 onClick={() => setIsEditing(true)} key={trackData._id}>
            {trackData.title}
        </h3>
    );
}

function TrackEdit({
    track,
    onCloseEditing
}: {
    track: ICourse;
    onCloseEditing: (data: ICourse) => void;
}) {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: track
    });
    const onSubmit = (data) => {
        myRequest.put('/track', { _id: track._id, ...data }).then(() => {
            onCloseEditing({ _id: track._id, ...data });
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="New track title"
                {...register('title')}
                required
            />
            <Button
                disabled={track.title === watch('title')}
                type="submit"
                variant="contained"
            >
                Save edited track
            </Button>
        </Box>
    );
}

export default App;
