import { PopulatedHomework } from '@commonTypes';
import { useLocation } from 'react-router-dom';
import { ILesson } from '../../../../types/api';
import { qp } from '../../../../utils/paths';
import { LessonView } from '../../../Lesson/LessonView';
import { ChatView } from './components/ChatView/ChatView';
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
                <LessonView
                    lesson={currentHomework.lessonId as unknown as ILesson}
                />
            </div>
            <div className={s.chatColumn}>
                <ChatView homework={currentHomework} />
            </div>
        </>
    );
}
