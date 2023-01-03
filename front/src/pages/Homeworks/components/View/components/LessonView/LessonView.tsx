import s from './LessonView.module.css';

export function LessonView({ lesson }) {
    return (
        <>
            <h1>{lesson.title}</h1>
            <h3>Description</h3>
            <div
                className={s.description}
                dangerouslySetInnerHTML={{
                    __html: lesson.description
                }}
            ></div>

            <h3>Homework</h3>
            <div
                className={s.description}
                dangerouslySetInnerHTML={{
                    __html: lesson.homework
                }}
            ></div>

            <iframe
                title="lesson_from_youtube"
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${lesson.link}?autoplay=0`}
                frameBorder="0"
                allowFullScreen
            />
        </>
    );
}
