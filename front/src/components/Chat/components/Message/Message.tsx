import { Attachments } from '../Attachments/Attachments';
import { MessageCommon } from '../../../../../../shared/commonParts';
import s from './Message.module.css';
import { mongoDateTranform } from '../../../../utils/date';

interface MessageProps
    extends Omit<MessageCommon, '_id' | 'senderId' | 'chatId'> {
    isMine?: boolean;
}

export const Message = ({
    isMine = false,
    attachments,
    text,
    createdAt
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
                <div className={s.time}>{mongoDateTranform(createdAt)}</div>
                {attachments && <Attachments attachments={attachments} />}
            </div>
        </div>
    );
};
