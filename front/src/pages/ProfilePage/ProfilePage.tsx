import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { SalaryCounter } from '../../components/SalaryCounter/SalaryCounter';
import { SalaryProgressBar } from '../../components/SalaryProgressBar/SalaryProgressBar';
import s from './ProfilePage.module.css';

export const ProfilePage = () => {
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
                    <p>
                        моя зарплата <SalaryCounter />в месяц
                    </p>
                    <div className={s.progress}>
                        <SalaryProgressBar />
                    </div>
                </div>
            </div>
        </MainBlockWrapper>
    );
};
