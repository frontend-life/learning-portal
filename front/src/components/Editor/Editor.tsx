import { useEffect, useRef, useState } from 'react';
import { Align } from '../../types/components';
import { cls } from '../../utils/css';
import s from './Editor.module.css';
import { tab } from './utils';

export const Editor = (props: {
    defaultValue?: string;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    rhfProps?: {
        name: string;
        register: any;
        setValue?: any;
    };
    labelAlign?: Align;
    error?: string;
    showHowItLooks?: boolean;
    editorClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
    placeholder?: string;
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    // for preview
    const [html, setHtml] = useState('');
    const {
        showHowItLooks = true,
        defaultValue,
        inputProps,
        rhfProps,
        error,
        labelAlign = 'center',
        editorClassName = '',
        labelClassName = '',
        errorClassName = '',
        placeholder = 'Type here'
    } = props;

    useEffect(() => {
        if (rhfProps) {
            rhfProps.register(rhfProps.name);
        }
    }, [rhfProps]);

    useEffect(() => {
        if (defaultValue !== undefined && editorRef.current) {
            editorRef.current.innerHTML = defaultValue;
        }
    }, [defaultValue]);

    const getLabel = () => {
        if (inputProps?.label) {
            return (
                <p
                    style={{ textAlign: labelAlign }}
                    className={cls(s.label, labelClassName)}
                >
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
                data-ph={placeholder}
                ref={editorRef}
                contentEditable
                className={cls(editorClassName, s.root)}
                onPaste={(e) => {
                    // Prevent the default action
                    e.preventDefault();

                    // Get the copied text from the clipboard
                    const text = e.clipboardData
                        ? e.clipboardData.getData('text/plain')
                        : '';

                    if (document.queryCommandSupported('insertText')) {
                        document.execCommand('insertText', false, text);
                    } else {
                        // Insert text at the current position of caret
                        const range = document.getSelection()?.getRangeAt(0);
                        if (range) {
                            range.deleteContents();

                            const textNode = document.createTextNode(text);
                            range.insertNode(textNode);
                            range.selectNodeContents(textNode);
                            range.collapse(false);

                            const selection = window.getSelection();
                            if (selection) {
                                selection.removeAllRanges();
                                selection.addRange(range);
                            }
                        }
                    }
                }}
                onInput={(e) => {
                    console.log('input', e.currentTarget.innerHTML);
                    let { innerHTML } = e.currentTarget;
                    if (innerHTML === '<br>') {
                        innerHTML = '';
                        e.currentTarget.innerHTML = '';
                    }
                    setHtml(innerHTML);
                    rhfProps?.setValue(rhfProps.name, innerHTML);
                }}
                onChange={(e) => {
                    e.preventDefault();
                }}
                onKeyDown={(e) => {
                    console.log('input', e.keyCode);
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        tab(e);
                        setHtml(e.currentTarget.innerHTML);
                    }
                }}
            />
            {showHowItLooks && (
                <div
                    style={{
                        display: 'inline-block',
                        verticalAlign: 'top',
                        marginLeft: '20px'
                    }}
                    dangerouslySetInnerHTML={{ __html: html }}
                ></div>
            )}
            {error && <p className={cls(s.error, errorClassName)}>{error}</p>}
        </div>
    );
};
