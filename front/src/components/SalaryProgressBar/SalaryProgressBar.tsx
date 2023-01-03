import { useLayoutEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import s from './SalaryProgressBar.module.css';

export const stamps = [1, 2, 3, 4, 5] as const;
const maxSalary = 5_000;

// value === xxx_000

export const SalaryProgressBar = ({ value }: { value: number }) => {
    const [k, setK] = useState(1);
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (ref.current) {
            const width = ~~ref.current.getBoundingClientRect().width;
            const k = width / maxSalary;
            setK(k);
        }
    }, [value]);

    const percentOfMaxSalary = ~~(value / (maxSalary / 100));
    return (
        <div className={s.root}>
            <div ref={ref} className={s.progressBar}>
                <div
                    className={s.progress}
                    style={{ width: percentOfMaxSalary + '%' }}
                />
            </div>
            {stamps.map((s) => {
                const mode = value >= s * 1000 ? 'light' : 'dark';
                const percent = (100 / (maxSalary / 1000)) * s;
                return <Icon key={s} money={s} mode={mode} percent={percent} />;
            })}
        </div>
    );
};
