import { useCallback, useRef, useState } from 'react';
import { addErrorNt, addWNt } from '../../utils/notification';
import { generateUid } from '../../utils/uid';
import { Image } from './components/Image/Image';

import { myRequest } from '../../utils/axios';
import { IHomework } from '../../types/api';
import { Editor } from '../Editor/Editor';
import { useForm } from 'react-hook-form';

import s from './Chat.module.css';

type ImgData = {
    url: string;
    uid: string;
    formData: FormData;
};

type ChatProps = {
    lessonId: string;
    hwId?: string;
    onReload?: () => void;
};

export const Chat = ({ lessonId, onReload, hwId }: ChatProps) => {
    const refEditable = useRef<HTMLDivElement>(null);
    const [imgsToPreview, setImgsToPreview] = useState<Array<ImgData>>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const { register, setValue, getValues } = useForm();
    const [editorDefaultValue, setEditorDefaultValue] = useState<string>();

    const onSend = async () => {
        if (getValues().homework === undefined) {
            addWNt('No text, no message');
            return;
        }
        const textToSend = getValues().homework.trim();

        if (textToSend === '' && imgsToPreview.length === 0) {
            return;
        }

        const saveHwToServer = (data: IHomework) => {
            const url = hwId ? `/homework?hwId=${hwId}` : '/homework';
            return myRequest
                .post(url, data)
                .then(() => {
                    setImgsToPreview([]);
                    setValue('homework', '');
                    setEditorDefaultValue('');
                    setTimeout(() => {
                        setEditorDefaultValue(undefined);
                    }, 500);
                    if (refEditable.current) {
                        refEditable.current.innerText = '';
                    }
                })
                .catch((e) => {
                    addErrorNt('Failed update homeworks list');
                })
                .finally(() => {
                    onReload && onReload();
                });
        };

        let data: IHomework = {
            content: {
                text: textToSend
            },
            lessonId
        };

        if (imgsToPreview.length === 0) {
            saveHwToServer(data);
            return;
        } else {
            sendImagesToServer()
                .then((responseWithAttaches) => {
                    const attachesIds = responseWithAttaches.map(
                        ({ attach }) => attach._id
                    );
                    data.content.attachments = attachesIds;
                    saveHwToServer(data);
                })
                .catch((e) => console.log(e));
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
            throw e;
        });
    }, [imgsToPreview, myRequest.post, addErrorNt]);

    const addImage = () => {
        imageInputRef.current?.click();
    };
    const catchImage = (e) => {
        for (let file of e.target.files) {
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
                <Editor
                    defaultValue={editorDefaultValue}
                    showHowItLooks={false}
                    rhfProps={{
                        register,
                        setValue,
                        name: 'homework'
                    }}
                    editorClassName={s.newMessageEditor}
                    placeholder="New message"
                />
                <div className={s.buttons}>
                    <button className={s.addImage} onClick={addImage}>
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
                    <button onClick={onSend} className={s.sendButton}>
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
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
