import { NewMessage } from './components/NewMessage/NewMessage';
import s from './Chat.module.css';
import { Message, MessageType } from './components/Message/Message';
import chatBG from './chatBG.png';
import chatBG2 from './chatBG2.png';
import { useUserContext } from '../../store/UserDetails';

const GreenYellowBG = () => (
    <div className={s.rootBG} style={{ backgroundImage: `url(${chatBG2})` }} />
);

interface Props {
    width?: number;
    minHeight?: number;
    messages?: MessageType[];
}

export const Chat = ({
    width = 500,
    minHeight = 300,
    messages = []
}: Props) => {
    const { userDetails } = useUserContext();
    return (
        <div
            className={s.root}
            style={{
                backgroundImage: `url(${chatBG})`,
                width,
                minWidth: width,
                minHeight
            }}
        >
            <GreenYellowBG />
            <div className={s.messages}>
                {messages?.map(
                    ({ _id, attachments, senderId, text, sentTime }) => {
                        return (
                            <Message
                                key={_id}
                                isMine={senderId === userDetails?._id}
                                attachments={attachments}
                                text={text}
                                sentTime={sentTime}
                            />
                        );
                    }
                )}
            </div>
            <NewMessage lessonId="123" />
        </div>
    );
};
