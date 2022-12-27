import { useState } from 'react';
import ModalImage from 'react-modal-image';
import { format } from 'date-fns';
import { Chat } from '../../components/Chat/Chat';
import s from './Homework.module.css';
import { getBaseUrl } from '../../utils/axios';

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
            <div className={s.attachments}>
                {attachments.map((att) => {
                    console.log(attachments);
                    const url = `${getBaseUrl()}${att.path.split('public')[1]}`;
                    console.log('attachment url', url);
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
            </div>
            {createdAt && (
                <div className={s.hwTime}>
                    {format(new Date(createdAt), 'dd/MM/yyyy H:mm')}
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
