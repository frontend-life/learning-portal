import React from 'react';
import s from './Input.module.css';

export const Input = (props: React.HTMLProps<HTMLInputElement>) => {
    const getLabel = () => {
        if (props.label) {
            return <span className={s.label}>{props.label}</span>;
        }
        return null;
    };
    return (
        <>
            {getLabel()}
            <input {...props} className={s.root} />
        </>
    );
};
