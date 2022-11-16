import s from './SalaryCounter.module.css';

export const SalaryCounter = ({ value }: { value: number }) => {
    return <div className={s.salaryCounter}>{value}</div>;
};
