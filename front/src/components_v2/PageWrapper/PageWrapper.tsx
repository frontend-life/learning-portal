import { ReactElement } from 'react';
import s from './PageWrapper.module.css';

export const PageWrapper = ({ children }: { children: ReactElement }) => {
    return (
        <div className={s.root}>
            <div className={s.wrapper}>{children}</div>
        </div>
    );
};
