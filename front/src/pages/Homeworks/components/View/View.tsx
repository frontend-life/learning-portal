import { PopulatedHomework } from '@commonTypes';
import { useLocation } from 'react-router-dom';
import { qp } from '../../../../utils/paths';
import { ChatView } from './components/ChatView/ChatView';
import { LessonView } from './components/LessonView/LessonView';
import { useParams } from './hooks/useParams';

import s from './View.module.css';

interface Props {
    data: PopulatedHomework[];
}

export function View({ data }: Props) {
    const { homeworkId, userName } = useParams();

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
