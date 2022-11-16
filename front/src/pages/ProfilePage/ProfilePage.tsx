import { useState } from 'react';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { SalaryCounter } from '../../components/SalaryCounter/SalaryCounter';
import { SalaryProgressBar } from '../../components/SalaryProgressBar/SalaryProgressBar';
import s from './ProfilePage.module.css';

export const ProfilePage = () => {
    const [value, setValue] = useState(132334);
    return (
        <MainBlockWrapper title="МОЙ ПРОФИЛЬ">
            <div className={s.root}>
                <div className={s.info}>
                    <div className={s.avatarSkeleton}>
                        Profile avatar <br /> in future
                    </div>
                    <div className={s.textInfo}>Sergey Prilepko</div>
                </div>
                <div className={s.salary}>
                    <div>
                        моя зарплата <SalaryCounter value={value} />в месяц
                    </div>
                    <div className={s.progress}>
                        <SalaryProgressBar value={value} />
                    </div>
                </div>
            </div>
        </MainBlockWrapper>
    );
};
