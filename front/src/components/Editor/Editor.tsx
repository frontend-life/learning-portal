import { useEffect, useRef, useState } from 'react';
import { Align } from '../../types/components';
import s from './Editor.module.css';
import { tab } from './utils';

export const Editor = (props: {
    defaultValue?: string;
    inputProps: React.HTMLProps<HTMLInputElement>;
    rhfProps?: {
        name: string;
        register: any;
        setValue?: any;
    };
    labelAlign?: Align;
    error?: string;
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    // for preview
    const [html, setHtml] = useState('');
    const {
        defaultValue,
        inputProps,
        rhfProps,
        error,
        labelAlign = 'center'
    } = props;

    useEffect(() => {
        if (rhfProps) {
            rhfProps.register(rhfProps.name);
        }
    }, [rhfProps]);

    useEffect(() => {
        if (defaultValue && editorRef.current) {
            editorRef.current.innerHTML = defaultValue;
        }
    }, [defaultValue]);

    const getLabel = () => {
        if (inputProps.label) {
            return (
                <p style={{ textAlign: labelAlign }} className={s.label}>
                    {inputProps.label}
                </p>
            );
        }
        return null;
    };

    return (
        <div className={s.wrapper}>
            {getLabel()}
            <div
                ref={editorRef}
                contentEditable
                className={s.root}
                onInput={(e) => {
                    setHtml(e.currentTarget.innerHTML);
                    rhfProps?.setValue(
                        rhfProps.name,
                        e.currentTarget.innerHTML
                    );
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        tab(e);
                        setHtml(e.currentTarget.innerHTML);
                    }
                }}
            />
            <div
                style={{
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '20px'
                }}
                dangerouslySetInnerHTML={{ __html: html }}
            ></div>
            {error && <p className={s.error}>{error}</p>}
        </div>
    );
};
