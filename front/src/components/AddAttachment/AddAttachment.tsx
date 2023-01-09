import { generateUid } from '@utils/uid';
import { useRef } from 'react';
import s from './AddAttachment.module.css';

interface AttachType {
    path: string;
    _id: string;
    formData: FormData;
}
export interface AddAttachProps {
    onAdd: (newAttaches: AttachType[]) => void;
    disabled?: boolean;
}

export const AddAttachment = ({ onAdd, disabled }: AddAttachProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const addImage = () => {
        imageInputRef.current?.click();
    };
    const catchImage = (e) => {
        const { files } = e.target;

        const result: AttachType[] = [];
        const promises: Promise<void>[] = [];
        for (let file of files) {
            const reader = new FileReader();

            promises.push(
                new Promise((res) => {
                    reader.addEventListener('load', (e) => {
                        const uploaded_image = reader.result;
                        const path = String(uploaded_image);
                        const _id = generateUid();
                        const formData = new FormData();
                        formData.append('file', file);

                        result.push({
                            path,
                            _id,
                            formData
                        });
                        res();
                    });
                })
            );

            reader.readAsDataURL(file);
        }

        Promise.all(promises).then(() => {
            onAdd(result);
        });
    };
    return (
        <>
            <button className={s.root} onClick={addImage} disabled={disabled}>
                <i className="fa-solid fa-paperclip"></i>
            </button>
            <input
                style={{ display: 'none' }}
                onChange={catchImage}
                ref={imageInputRef}
                type="file"
                id="image-input"
                multiple
                accept="image/jpeg, image/png, image/jpg"
            ></input>
        </>
    );
};
