import { AttachmentCommon } from '../../../../../../shared/commonParts';
import { Image } from '../Image/Image';
import s from './Attachments.module.css';

interface Props {
    attachments: AttachmentCommon[];
    removeImage?: (_id: string) => any;
}

export const Attachments = ({ attachments, removeImage }: Props) => {
    return (
        <div className={s.root}>
            {attachments.map(({ path, _id }) => {
                const onRemove = removeImage && (() => removeImage(_id));

                return <Image key={_id} url={path} onRemove={onRemove} />;
            })}
        </div>
    );
};
