import { Navigate, useLocation } from 'react-router-dom';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { ILesson } from '../../types/api';
import { PATHS } from '../../utils/paths';
import s from './Lesson.module.css';

function Lesson() {
    const { state: lesson }: { state: ILesson } = useLocation();

    if (!lesson) {
        alert('No lesson');
        return <Navigate to={PATHS.lessons} replace={true} />;
    }

    return (
        <MainBlockWrapper title="Lesson">
            <div className={s.root}>
                <h1>{lesson.title}</h1>
                <h3>Description</h3>
                <code className={s.description}>{lesson.description}</code>
                <iframe
                    title="lesson_from_youtube"
                    width="820"
                    height="515"
                    src={`https://www.youtube.com/embed/${lesson.link}?autoplay=1`}
                    frameBorder="0"
                    allowFullScreen
                />
                <div className={s.homework}>
                    <h3>Homework</h3>
                    <textarea
                        rows={4}
                        cols={50}
                        placeholder="Write here your homework or comments"
                    ></textarea>
                </div>
            </div>
        </MainBlockWrapper>
    );
}

export default Lesson;
