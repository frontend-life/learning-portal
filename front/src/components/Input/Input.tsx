import React from 'react';
import { Align } from '../../types/components';
import s from './Input.module.css';

export const Input = (props: {
    inputProps: React.HTMLProps<HTMLInputElement>;
    rhfProps: any;
    labelAlign?: Align;
    error?: string;
}) => {
    const { inputProps, rhfProps, error, labelAlign = 'center' } = props;

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
            <input {...inputProps} {...rhfProps} className={s.root} />
            {error && <p className={s.error}>{error}</p>}
        </div>
    );
};
