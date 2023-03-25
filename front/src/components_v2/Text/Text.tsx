import { cls } from '@utils/css';
import s from './Text.module.css';

export const Text = ({
    children,
    size,
    className
}: {
    children: string | number;
    size: 14 | 24;
    className?: string;
}) => {
    return (
        <span
            className={cls(
                s.root,
                {
                    [s.root14Size]: size === 14,
                    [s.root24Size]: size === 24
                },
                className || ''
            )}
        >
            {children}
        </span>
    );
};
