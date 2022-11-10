import { Button, TextField, Typography, Box } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
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
import MainBlockWrapper from './components/MainBlockWrapper/MainBlockWrapper';
import { AddLesson } from './pages/AddLesson/AddLesson';
import Lesson from './pages/Lesson/Lesson';
import { ILesson, ITrack } from './types/api';
import { myRequest } from './utils/axios';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { AuthPage } from './pages/Auth/AuthPage';

const urls = [
    {
        path: '/dashboard',
        Element: Dashboard
    },
    {
        path: '/about',
        Element: AboutPage
    },
    {
        path: '/auth',
        Element: AuthPage
    },
    {
        path: '/lesson',
        Element: Lesson
    },
    {
        path: '/lessons',
        Element: Lessons
    },
    {
        path: '/add_lesson',
        Element: AddLesson
    },
    {
        path: '/tracks',
        Element: TracksPage
    }
];

function App() {
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
                        <Routes>
                            <Route path="/">
                                <Route index element={<Landing />} />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/auth" element={<AuthPage />} />
                                <Route
                                    path="/lesson/:id"
                                    element={<Lesson />}
                                />
                                <Route path="/lessons" element={<Lessons />} />
                                <Route
                                    path="/add_lesson"
                                    element={<AddLesson />}
                                />
                                <Route
                                    path="/tracks"
                                    element={<TracksPage />}
                                />
                                <Route
                                    path="*"
                                    element={<Navigate to="/" replace={true} />}
                                />
                            </Route>
                        </Routes>
                    </ErrorBoundary>
                </div>
            </BrowserRouter>
        </div>
    );
}

function Landing() {
    return <h1>Landing</h1>;
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
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        myRequest.post('/track', data).then((result: any) => {
            const newTrack: ITrack = {
                ...data,
                _id: result.insertedId
            };
            setTracks((prev) => [...prev, newTrack]);
        });
    };

    useEffect(() => {
        myRequest.get('/track').then((data) => {
            setTracks(data as unknown as ITrack[]);
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

function TrackRaw({ track }: { track: ITrack }) {
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
            {trackData.track_name}
        </h3>
    );
}

function TrackEdit({
    track,
    onCloseEditing
}: {
    track: ITrack;
    onCloseEditing: (data: ITrack) => void;
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
                {...register('track_name')}
                required
            />
            <Button
                disabled={track.track_name === watch('track_name')}
                type="submit"
                variant="contained"
            >
                Save edited track
            </Button>
        </Box>
    );
}

export default App;
