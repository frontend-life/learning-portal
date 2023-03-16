import { cls } from '@utils/css';
import s from './CounterRating.module.css';

export const CounterRating = ({
    number,
    className
}: {
    number: number;
    className: string;
}) => {
    const text = number.toString();

    return <div className={cls(s.root, className || '')}>{text}</div>;
};
