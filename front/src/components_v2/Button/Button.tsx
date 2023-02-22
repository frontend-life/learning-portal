import s from './Button.module.css';
import { ReactComponent as Loader } from './assets/loader.svg'
import React from 'react';

export const Button = ({text, loading, onSubmit, disabled}:{text:string, loading: boolean, onSubmit: React.MouseEventHandler<HTMLButtonElement>, disabled:boolean}) => {
    return (
        <button className={s.button} disabled={disabled} onClick={onSubmit}>
            {!loading ? text : <Loader className={s.spinner} />}
        </button>
    );
};