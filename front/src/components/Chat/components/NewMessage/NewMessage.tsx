import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AttachmentCommon, MessageCommon } from '@commonTypes';
import { useUserContext } from '../../../../store/UserDetails';
import { IMessage } from '../../../../types/api';
import { API_ROUTES, myRequest } from '@utils/axios';
import { cls } from '@utils/css';
import { addWNt, addErrorNt } from '@utils/notification';

import {
    AddAttachment,
    AddAttachProps
} from '../../../AddAttachment/AddAttachment';
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
    const { register, setValue, getValues } = useForm();
    const [editorDefaultValue, setEditorDefaultValue] = useState<string>();

    const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true);

        const saveMessage = (data: IMessage) => {
            const url = `${API_ROUTES.MESSAGE}`;
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
            saveMessage(data).finally(() => {
                setIsLoading(false);
            });
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
                .catch((e) => console.log(e))
                .finally(() => {
                    setIsLoading(false);
                });
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

    const removeImage = (uid: ImgData['_id']) => {
        setImgsToPreview((prev) => prev.filter(({ _id: id }) => id !== uid));
    };

    const handleCntrlSend = (e) => {
        const ENTER_KEY = 13;

        if (e.keyCode === ENTER_KEY && e.ctrlKey) {
            handleSend();
        }
    };

    const handleAddImage: AddAttachProps['onAdd'] = (files) => {
        if (imgsToPreview.length + files.length > 5) {
            addWNt("You can't add more then 5 images");
            return;
        }

        setImgsToPreview((prev) => [...prev, ...files]);
    };

    return (
        <div className={s.root}>
            {/* {isLoading && <CircleLoader isAbsolute inCenterOfBlock />} */}
            <div
                className={cls(s.textAndButtons, {
                    [s.textAndButtonsLoading]: isLoading
                })}
                onKeyDown={handleCntrlSend}
            >
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
                    <AddAttachment
                        onAdd={handleAddImage}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        className={s.sendButton}
                        disabled={isLoading}
                    >
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
