import { NewMessage } from './components/NewMessage/NewMessage';
import s from './Chat.module.css';
import { Message } from './components/Message/Message';
import chatBG from './chatBG.png';
import chatBG2 from './chatBG2.png';
import { useUserContext } from '../../store/UserDetails';
import { useEffect, useState } from 'react';
import { MessageCommon } from '@commonTypes';
import { useChatEvents } from './hooks/useChatEvents';
import { cls } from '@utils/css';
import { CircleLoader } from '../CircleLoader/CircleLoader';
import { Backend } from '@shared/Backend';

const GreenYellowBG = () => (
    <div className={s.rootBG} style={{ backgroundImage: `url(${chatBG2})` }} />
);

interface Props {
    width?: number;
    minHeight?: number;
    chatId: string;
}

export const Chat = ({ width = 500, minHeight = 300, chatId }: Props) => {
    const { userDetails } = useUserContext();
    const [messages, setMessages] = useState<MessageCommon[]>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(false);
        Backend.getChat({
            params: {
                chatId,
                populate: {
                    messages: 1
                }
            }
        })
            .then((chat: any) => {
                if (chat?.messages as MessageCommon[]) {
                    const sorted = chat.messages.sort((a, b) => {
                        return +new Date(b.createdAt) - +new Date(a.createdAt);
                    });
                    setMessages(sorted);
                }
            })
            .finally(() => {
                setIsReady(true);
            });
    }, [chatId]);

    const addMessageToView = (message: MessageCommon) => {
        setMessages((prev) => [message, ...prev]);
    };

    useChatEvents(chatId, addMessageToView);

    return (
        <div
            className={cls(s.root, { [s.rootLoading]: !isReady })}
            style={{
                backgroundImage: `url(${chatBG})`,
                width,
                minWidth: width,
                minHeight
            }}
        >
            {!isReady && <CircleLoader inCenterOfBlock isAbsolute />}
            <GreenYellowBG />
            <div className={s.body}>
                <NewMessage chatId={chatId} onSend={addMessageToView} />

                <div className={s.messages}>
                    {messages?.map(
                        ({ _id, attachments, senderId, text, createdAt }) => {
                            return (
                                <Message
                                    key={_id}
                                    isMine={senderId === userDetails?._id}
                                    attachments={attachments}
                                    text={text}
                                    createdAt={createdAt}
                                />
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
};
