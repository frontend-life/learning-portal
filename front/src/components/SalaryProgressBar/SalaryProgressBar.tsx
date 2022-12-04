import { useLayoutEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import s from './SalaryProgressBar.module.css';

export const stamps = [20, 40, 60, 80, 100] as const;
const maxSalary = 250_000;

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
                const mode = percentOfMaxSalary >= s ? 'light' : 'dark';
                return <Icon key={s} money={s} mode={mode} percent={s} />;
            })}
        </div>
    );
};
