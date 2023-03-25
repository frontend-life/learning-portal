import s from './Button.module.css';
import { ReactComponent as Loader } from './assets/loader.svg';
import React from 'react';
import { cls } from '@utils/css';

interface ButtonProps {
    text: string;
    loading?: boolean;
    onSubmit: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    mode?: 'main' | 'secondary';
    className?: string;
}

export const Button = ({
    mode,
    text,
    loading,
    onSubmit,
    disabled,
    className
}: ButtonProps) => {
    return (
        <button
            className={cls(
                s.button,
                {
                    [s.buttonSecondary]: mode === 'secondary',
                    [s.buttonMain]: !mode || mode === 'main'
                },
                className || ''
            )}
            disabled={disabled}
            onClick={onSubmit}
        >
            {!loading ? text : <Loader className={s.spinner} />}
        </button>
    );
};
