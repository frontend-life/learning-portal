import s from './Image.module.css';
import ModalImage from 'react-modal-image';
import { ImgView } from '../NewMessage/NewMessage';

export const Image = ({
    url,
    onRemove
}: {
    url: ImgView['url'];
    onRemove?: any;
}) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
        <div className={s.imgContainer}>
            <div className={s.image}>
                <ModalImage
                    small={url}
                    large={url}
                    alt="If you see this something went wrong"
                />
            </div>
            {onRemove && (
                <div className={s.deleteImage} onClick={onRemove}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            )}
        </div>
    );
};
