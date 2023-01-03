import { AttachmentCommon } from '../../../../../../shared/commonParts';
import { getAttachPath } from '../../../../utils/paths';
import { Image } from '../Image/Image';
import s from './Attachments.module.css';

interface Props {
    attachments: AttachmentCommon[];
    removeImage?: (_id: string) => any;
}

export const Attachments = ({ attachments, removeImage }: Props) => {
    const isLocalView = !!removeImage;
    return (
        <div className={s.root}>
            {attachments.map(({ path, _id }) => {
                if (!path) {
                    return null;
                }
                const onRemove = removeImage && (() => removeImage(_id));
                const networkPath = isLocalView ? path : getAttachPath(path);
                return (
                    <Image key={_id} url={networkPath} onRemove={onRemove} />
                );
            })}
        </div>
    );
};
