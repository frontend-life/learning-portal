import { useState } from 'react';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { SalaryCounter } from '../../components/SalaryCounter/SalaryCounter';
import { SalaryProgressBar } from '../../components/SalaryProgressBar/SalaryProgressBar';
import { useUserContext } from '../../store/UserDetails';
import s from './ProfilePage.module.css';

export const ProfilePage = () => {
    const {
        userDetails: { salary, name }
    } = useUserContext();
    return (
        <MainBlockWrapper title="МОЙ ПРОФИЛЬ">
            <div className={s.root}>
                <div className={s.info}>
                    <div className={s.avatarSkeleton}>
                        Profile avatar <br /> in future
                    </div>
                    <div className={s.textInfo}>{name}</div>
                </div>
                <div className={s.salary}>
                    <div>
                        моя зарплата <SalaryCounter value={salary} />в месяц
                    </div>
                    <div className={s.progress}>
                        <SalaryProgressBar value={salary} />
                    </div>
                </div>
            </div>
        </MainBlockWrapper>
    );
};
