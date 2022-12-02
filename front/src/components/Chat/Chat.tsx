import { useCallback, useRef, useState } from 'react';
import addNt, { addErrorNt } from '../../utils/notification';
import { generateUid } from '../../utils/uid';
import ModalImage from 'react-modal-image';

import s from './Chat.module.css';
import { myRequest } from '../../utils/axios';
import { IHomework } from '../../types/api';

const Image = ({ url, onRemove }: { url: string; onRemove: any }) => {
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
                X
            </div>
        </div>
    );
};

type ImgData = {
    url: string;
    uid: string;
    formData: FormData;
};

export const Chat = ({ lessonId, onReload }) => {
    const refEditable = useRef<HTMLDivElement>(null);
    const [text, setText] = useState('');
    const [imgsToPreview, setImgsToPreview] = useState<Array<ImgData>>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const onSend = async () => {
        const textToSend = text.trim();

        if (textToSend === '' && imgsToPreview.length === 0) {
            return;
        }

        const saveHwToServer = (data: IHomework) => {
            return myRequest
                .post('/homework', data)
                .then(() => {
                    setImgsToPreview([]);
                    setText('');
                    if (refEditable.current) {
                        refEditable.current.innerText = '';
                    }
                    onReload();
                })
                .catch((e) => {
                    addErrorNt('Failed dave homework');
                });
        };

        if (imgsToPreview.length === 0) {
            let data: IHomework = {
                content: {
                    text: textToSend
                },
                lessonId
            };
            saveHwToServer(data);
            return;
        } else {
            sendImagesToServer().then((responseWithAttaches) => {
                const attachesIds = responseWithAttaches.map(
                    ({ attach }) => attach._id
                );
                let data: IHomework = {
                    content: {
                        text: textToSend,
                        attachments: attachesIds
                    },
                    lessonId
                };
                saveHwToServer(data);
            });
        }
    };

    //  Метод посылает аттачи (картинки) на сервер пачкой запросов, собирает все промис ол и возвращает нам это
    const sendImagesToServer = useCallback<() => any>(() => {
        const imgsToSend = imgsToPreview.map(({ formData }) => formData);
        return Promise.all(
            imgsToSend.map((formData) =>
                myRequest.post('/attachment', formData)
            )
        ).catch((e) => {
            addErrorNt('Some error with saving attachments');
        });
    }, [imgsToPreview, myRequest.post, addErrorNt]);

    const handleChangeText = (e) => {
        setText(e.currentTarget.innerText);
    };

    const addImage = () => {
        imageInputRef.current?.click();
    };
    const catchImage = (e) => {
        for (let file of e.target.files) {
            console.log(file);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                const uploaded_image = reader.result;
                const url = String(uploaded_image);
                const uid = generateUid();
                const formData = new FormData();
                formData.append('file', file);

                setImgsToPreview((prev) => [
                    ...prev,
                    {
                        url,
                        uid,
                        formData
                    }
                ]);
            });
            reader.readAsDataURL(file);
        }
    };
    const removeImage = (uid: ImgData['uid']) => {
        setImgsToPreview((prev) => prev.filter(({ uid: id }) => id !== uid));
    };

    return (
        <div className={s.root}>
            <div className={s.textAndButtons}>
                <div className={s.buttons}>
                    <button className={s.addImage} onClick={addImage}>
                        Add image
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
                    <button onClick={onSend} className={s.sendButton}>
                        Send message
                    </button>
                </div>
                <div
                    ref={refEditable}
                    className={s.text}
                    contentEditable
                    onInput={handleChangeText}
                />
            </div>
            <div className={s.attachments}>
                {imgsToPreview.map(({ url, uid }) => {
                    return (
                        <Image
                            key={uid}
                            url={url}
                            onRemove={() => removeImage(uid)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
