import { PopulatedHomework } from '@commonTypes';
import { Chat } from '../../../../components/Chat/Chat';
import { HWDoneButton } from '../../../../components/HWDoneButton/HWDoneButton';

export function ChatView({ homework }: { homework: PopulatedHomework }) {
    const { chatId, lessonId, studentId, approved } = homework;

    const actionType: Parameters<typeof HWDoneButton>['0']['type'] = approved
        ? 'disaprove'
        : 'approve';

    return (
        <>
            {chatId && <Chat chatId={chatId} />}
            <HWDoneButton
                lessonId={lessonId._id}
                studentId={studentId._id}
                type={actionType}
            />
        </>
    );
}
