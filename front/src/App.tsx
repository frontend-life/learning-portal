import { Button, TextField } from '@mui/material';
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
import MainBlockWrapper from './MainBlockWrapper';
import { AddLesson } from './pages/AddLesson/AddLesson';
import Lesson from './pages/Lesson/Lesson';
import { ILesson } from './types/api';
import { myRequest } from './utils/axios';

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
        Element: Auth
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
    }
];

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <nav className="NavBar">
                    {urls.map(({ path }) => {
                        return (
                            <Link className="NavBar__li" to={path}>
                                {path}
                            </Link>
                        );
                    })}
                </nav>
                <div style={{ height: '100vh', overflow: 'auto'}}>
                <Routes>
                    <Route path="/">
                        <Route index element={<Landing />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/lesson/:id" element={<Lesson />} />
                        <Route path="/lessons" element={<Lessons />} />
                        <Route path="/add_lesson" element={<AddLesson />} />
                        <Route
                            path="*"
                            element={<Navigate to="/" replace={true} />}
                        />
                    </Route>
                </Routes>
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
function Auth() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        myRequest.post('/registration', data).then((res) => {
            console.log(res);
        });
    };
    return (
        <MainBlockWrapper>
            <Stack spacing={4}>
                <h1>Регистрация</h1>
                <TextField {...register('email')} label="Email" />
                <TextField {...register('password')} label="Password" />
                <TextField {...register('name')} label="NickName" />
                <Button onClick={handleSubmit(onSubmit)}>Registration</Button>
            </Stack>
        </MainBlockWrapper>
    );
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

export default App;
