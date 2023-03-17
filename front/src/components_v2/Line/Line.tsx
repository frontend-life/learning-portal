import { cls } from '@utils/css';
import s from './Line.module.css';

export const Line = ({ className }: { className: string }) => {
    return <div className={cls(s.root, className)}></div>;
};
