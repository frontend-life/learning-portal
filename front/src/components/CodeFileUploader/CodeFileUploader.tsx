import { Backend } from '@shared/Backend';
import { useRef } from 'react';
import s from './CodeFileUploader.module.css';

export const CodeFileUploader = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const catchFile = (e) => {
        const { files } = e.target;
        const reader = new FileReader();

        reader.onload = (e) => {
            const formData = new FormData();
            formData.append('file', files[0]);
            Backend.sendFileCodeToCheck(formData);
        };

        reader.readAsDataURL(files[0]);
    };
    return (
        <div className={s.root} onClick={() => inputRef.current?.click()}>
            <i className="fa-regular fa-file"></i>
            <span className={s.subheader}>Drop file here</span>
            <input
                style={{ display: 'none' }}
                onChange={catchFile}
                ref={inputRef}
                type="file"
                accept="text/html"
            ></input>
        </div>
    );
};
