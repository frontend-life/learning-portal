import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    AttachmentCommon,
    MessageCommon
} from '../../../../../../shared/commonParts';
import { useUserContext } from '../../../../store/UserDetails';
import { IMessage } from '../../../../types/api';
import { API_URLS, myRequest } from '../../../../utils/axios';
import { addWNt, addErrorNt } from '../../../../utils/notification';
import { generateUid } from '../../../../utils/uid';
import { Editor } from '../../../Editor/Editor';
import { Attachments } from '../Attachments/Attachments';

import s from './NewMessage.module.css';

export interface ImgData extends AttachmentCommon {
    formData: FormData;
}

export interface ImgView extends Omit<ImgData, 'formData'> {}

type NewMessageProps = {
    chatId: MessageCommon['chatId'];
    onSend: (message: MessageCommon) => void;
};

export const NewMessage = ({ chatId, onSend }: NewMessageProps) => {
    const user = useUserContext();
    const refEditable = useRef<HTMLDivElement>(null);
    const [imgsToPreview, setImgsToPreview] = useState<Array<ImgData>>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const { register, setValue, getValues } = useForm();
    const [editorDefaultValue, setEditorDefaultValue] = useState<string>();

    const handleSend = async () => {
        const { homework } = getValues();
        if (!homework?.trim()) {
            addWNt('No text, no message');
            return;
        }
        const text = homework.trim();

        if (text === '' && imgsToPreview.length === 0) {
            return;
        }

        const saveMessage = (data: IMessage) => {
            const url = `${API_URLS.MESSAGE}`;
            return myRequest
                .post(url, data)
                .then((message) => {
                    setImgsToPreview([]);
                    setValue('homework', '');
                    setEditorDefaultValue('');
                    setTimeout(() => {
                        setEditorDefaultValue(undefined);
                    }, 500);
                    if (refEditable.current) {
                        refEditable.current.innerText = '';
                    }
                    onSend(message as unknown as MessageCommon);
                })
                .catch((e) => {
                    addErrorNt('Failed send message');
                });
        };

        let data: IMessage = {
            text: text,
            senderId: user.userDetails._id,
            chatId
        };

        if (imgsToPreview.length === 0) {
            saveMessage(data);
            return;
        } else {
            sendImagesToServer()
                .then((responseWithAttaches) => {
                    const attachesIds = responseWithAttaches.map(
                        ({ status, value }) => value.attach._id
                    );
                    data.attachments = attachesIds;
                    saveMessage(data);
                })
                .catch((e) => console.log(e));
        }
    };

    //  Метод посылает аттачи (картинки) на сервер пачкой запросов, собирает все промис ол и возвращает нам это
    const sendImagesToServer = useCallback<() => any>(() => {
        const imgsToSend = imgsToPreview.map(({ formData }) => formData);
        return Promise.allSettled(
            imgsToSend.map((formData) =>
                myRequest.post('/attachment', formData)
            )
        ).catch((e) => {
            addErrorNt('Some error with saving attachments');
            throw e;
        });
    }, [imgsToPreview]);

    const addImage = () => {
        imageInputRef.current?.click();
    };
    const catchImage = (e) => {
        const { files } = e.target;
        if (imgsToPreview.length + files.length > 5) {
            addWNt("You can't add more then 5 images");
            return;
        }
        for (let file of files) {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                const uploaded_image = reader.result;
                const path = String(uploaded_image);
                const _id = generateUid();
                const formData = new FormData();
                formData.append('file', file);

                setImgsToPreview((prev) => [
                    ...prev,
                    {
                        path,
                        _id,
                        formData
                    }
                ]);
            });
            reader.readAsDataURL(file);
        }
    };
    const removeImage = (uid: ImgData['_id']) => {
        setImgsToPreview((prev) => prev.filter(({ _id: id }) => id !== uid));
    };

    const handleCntrlSend = (e) => {
        const ENTER_KEY = 13;

        if (e.keyCode === ENTER_KEY && e.ctrlKey) {
            handleSend();
        }
    };

    return (
        <div className={s.root}>
            <div className={s.textAndButtons} onKeyDown={handleCntrlSend}>
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
                    <button onClick={handleSend} className={s.sendButton}>
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
            </div>
            <Attachments
                removeImage={removeImage}
                attachments={imgsToPreview}
            />
        </div>
    );
};
