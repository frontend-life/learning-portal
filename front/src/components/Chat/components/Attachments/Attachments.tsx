import { Image } from '../Image/Image';
import s from './Attachments.module.css';

interface Attachment {
    url: string;
    uid: string;
}

interface Props {
    attachments: Attachment[];
    removeImage?: (uid: string) => any;
}

export const Attachments = ({ attachments, removeImage }: Props) => {
    return (
        <div className={s.root}>
            {attachments.map(({ url, uid }) => {
                const onRemove = removeImage && (() => removeImage(uid));

                return <Image key={uid} url={url} onRemove={onRemove} />;
            })}
        </div>
    );
};
