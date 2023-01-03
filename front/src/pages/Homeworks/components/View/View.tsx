import { PopulatedHomework } from '@commonTypes';
import { useLocation } from 'react-router-dom';
import { qp } from '../../../../utils/paths';
import { ChatView } from '../ChatView/ChatView';
import { LessonView } from '../LessonView/LessonView';
import s from './View.module.css';

interface Props {
    data: PopulatedHomework[];
}

export function View({ data }: Props) {
    const location = useLocation();
    const { homeworkId, userName } = qp(location.search);

    if (!homeworkId || !userName) {
        return null;
    }

    const currentHomework = data.find(({ _id, studentId }) => {
        return _id === homeworkId && studentId.name === userName;
    });

    if (!currentHomework) {
        return <h1>I don't know why, no such homework</h1>;
    }

    return (
        <>
            <div className={s.lessonColumn}>
                <LessonView lesson={currentHomework.lessonId} />
            </div>
            <div className={s.chatColumn}>
                <ChatView homework={currentHomework} />
            </div>
        </>
    );
}
