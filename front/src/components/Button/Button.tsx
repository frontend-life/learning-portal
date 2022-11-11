import React from 'react';
import s from './Button.module.css';

export const Button = (props: React.HTMLProps<HTMLElement>) => {
    return (
        //  @ts-ignore
        <button className={s.root} {...props}>
            {props.children}
        </button>
    );
};
