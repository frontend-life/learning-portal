import s from './BlackBox.module.css';

export const BlackBox = ({ children }) => {
    return <div className={s.root}>{children}</div>;
};
