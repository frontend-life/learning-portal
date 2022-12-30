import s from './Image.module.css';
import ModalImage from 'react-modal-image';

export const Image = ({ url, onRemove }: { url: string; onRemove: any }) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
        <div className={s.imgContainer}>
            <div className={s.image}>
                <ModalImage
                    small={url}
                    large={url}
                    alt="Image to show in modal"
                />
            </div>
            <div className={s.deleteImage} onClick={onRemove}>
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
    );
};
