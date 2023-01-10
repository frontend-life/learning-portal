import { PopulatedHomework } from '@commonTypes';
import { Chat } from '../../../../../../components/Chat/Chat';
import { DoneSign } from '../../../../../../components/DoneSign/DoneSign';
import { HWDoneButton } from '../../../../../../components/HWDoneButton/HWDoneButton';
import { useHomeworksContext } from '../../../../Homeworks';

export function ChatView({ homework }: { homework: PopulatedHomework }) {
    const { chatId, lessonId, studentId, approved } = homework;
    const { reload } = useHomeworksContext();

    const actionType: Parameters<typeof HWDoneButton>['0']['type'] = approved
        ? 'disaprove'
        : 'approve';

    return (
        <>
            {approved && (
                <div style={{ margin: '20px' }}>
                    <DoneSign />
                </div>
            )}
            {chatId && <Chat chatId={chatId} />}
            <HWDoneButton
                onAfterAprove={reload}
                lessonId={lessonId?._id}
                studentId={studentId?._id}
                type={actionType}
            />
        </>
    );
}
