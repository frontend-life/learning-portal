import { cls } from '@utils/css';
import { memo } from 'react';
import s from './CounterRating.module.css';

export const CounterRating = memo(
    ({ number, className }: { number: number; className: string }) => {
        const text = number
            .toString()
            .split('')
            .map((char, index, array) => {
                if (index !== array.length - 1) {
                    return (
                        <span key={index} className={s.number}>
                            {char}
                            <div
                                className={cls(s.spliter, {
                                    [s.spliterSmall]: !Boolean((index + 1) % 3)
                                })}
                            />
                        </span>
                    );
                }
                return (
                    <span key={index} className={s.number}>
                        {char}
                    </span>
                );
            });

        return <div className={cls(s.root, className || '')}>{text}</div>;
    }
);
