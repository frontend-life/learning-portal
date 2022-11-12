import React from 'react';
import s from './Input.module.css';

export const Input = (props: {
    inputProps: React.HTMLProps<HTMLInputElement>;
    rhfProps: any;
    error?: string;
}) => {
    const { inputProps, rhfProps, error } = props;

    const getLabel = () => {
        if (inputProps.label) {
            return <p className={s.label}>{inputProps.label}</p>;
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
