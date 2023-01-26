import { PATHS } from '@utils/paths';
import { useNavigate } from 'react-router-dom';
import { DoneSign } from '@components/DoneSign/DoneSign';
import { useUserContext } from '@store/UserDetails';
import { ILesson, Roles } from '@type/api';
import { IframGoogleDocsViewer } from '../AddLesson/components/DecriptionChecker/DecriptionChecker';

import s from './Lesson.module.css';

interface Props {
    lesson: Partial<ILesson>;
}

export const LessonView = ({ lesson }: Props) => {
    const {
        userDetails: { roles, lessonsDone }
    } = useUserContext();
    const isTeacher = roles.includes(Roles.TEACHER);
    const navigate = useNavigate();

    const headerProps = isTeacher
        ? {
              style: { cursor: 'pointer' },
              onClick: () => {
                  navigate(PATHS.add_lesson, {
                      state: lesson
                  });
              }
          }
        : {};

    if (!lesson?._id) {
        return <p>No lesson</p>;
    }

    const lessonDone = lessonsDone.includes(lesson?._id);

    return (
        <>
            {lessonDone && <DoneSign />}
            <h1 {...headerProps}>{lesson.title}</h1>
            {lesson.description && (
                <>
                    <h3>Description</h3>

                    <div
                        className={s.description}
                        dangerouslySetInnerHTML={{
                            __html: lesson.description
                        }}
                    ></div>
                </>
            )}
            {lesson.iframeGoogleDocs && (
                <div className={s.docsViewer}>
                    <IframGoogleDocsViewer
                        iframeHtml={lesson.iframeGoogleDocs}
                    />
                </div>
            )}
            {lesson.link && (
                <iframe
                    title="lesson_from_youtube"
                    width="820"
                    height="515"
                    src={`https://www.youtube.com/embed/${lesson.link}?autoplay=0`}
                    frameBorder="0"
                    allowFullScreen
                />
            )}
        </>
    );
};
