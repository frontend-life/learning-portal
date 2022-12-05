import { useState } from 'react';
import ModalImage from 'react-modal-image';
import { Chat } from '../../components/Chat/Chat';
import s from './Lesson.module.css';

export const Homework = ({
    h,
    withAnswer = false,
    onReload
}: {
    h: any;
    withAnswer?: boolean;
    onReload?: any;
}) => {
    const [hwaO, setHwaO] = useState(false);
    const openAnswerChat = () => {
        setHwaO(true);
    };
    const closeAnswerChat = () => {
        setHwaO(false);
    };

    const { content = null, createdAt = null } = h;
    const { attachments = [] } = content;

    return (
        <div key={h?._id} className={s.hw}>
            <pre>
                <code>{h?.content?.text}</code>
            </pre>
            {attachments.map((att) => {
                const url = `http://localhost:8000/${
                    att.path.split('public')[1]
                }`;
                return (
                    <div key={att._id} className={s.hw_img}>
                        <ModalImage
                            small={url}
                            large={url}
                            alt="Here should be a homework image, but it is gone:)"
                        />
                    </div>
                );
            })}
            {createdAt && (
                <div className={s.hwTime}>
                    Created at (greenwich time):{' '}
                    {new Date(createdAt).toISOString()}
                </div>
            )}
            {h.answer && (
                <div className={s.answer_content}>
                    <h2>Teacher answer</h2>
                    <Homework h={h.answer} />
                </div>
            )}
            {withAnswer && !h.answer && (
                <>
                    {!hwaO ? (
                        <div
                            className={s.hw_answer_button}
                            onClick={openAnswerChat}
                        >
                            Answer
                        </div>
                    ) : (
                        <div className={s.hw_answer}>
                            <h1>
                                Homework answer{' '}
                                <span
                                    className={s.hw_answer_cross}
                                    onClick={closeAnswerChat}
                                >
                                    X
                                </span>
                            </h1>
                            <Chat
                                lessonId={h.lessonId}
                                hwId={h._id}
                                onReload={onReload}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
