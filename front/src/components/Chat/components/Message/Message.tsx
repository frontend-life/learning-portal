import { Attachments } from '../Attachments/Attachments';
import { ImgView } from '../NewMessage/NewMessage';
import s from './Message.module.css';

interface MessageProps {
    isMine?: boolean;
    attachments?: Array<ImgView>;
    text?: string;
    sentTime?: string;
}

export const Message = ({
    isMine = false,
    attachments,
    text,
    sentTime
}: MessageProps) => {
    const rootStyles: React.CSSProperties = {};
    const messageStyles: React.CSSProperties = {};
    if (isMine) {
        Object.assign(rootStyles, {
            justifyContent: 'flex-end'
        });
        Object.assign(messageStyles, {
            backgroundColor: 'rgb(238,255,222)'
        });
    }
    return (
        <div className={s.root} style={rootStyles}>
            <div className={s.message} style={messageStyles}>
                <span className={s.text}>{text || 'Message disapeared'}</span>
                <div className={s.time}>{sentTime || '--:--'}</div>
                {attachments && <Attachments attachments={attachments} />}
            </div>
        </div>
    );
};

export interface MessageType extends Omit<MessageProps, 'isMine'> {
    senderId: string;
    _id: string;
}
