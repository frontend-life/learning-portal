import { cls } from '@utils/css';
import s from './Line.module.css';

export const Line = ({
    className,
    width
}: {
    className?: string;
    width?: string;
}) => {
    return (
        <div
            className={cls(s.root, className || '')}
            style={width ? { width } : {}}
        ></div>
    );
};
