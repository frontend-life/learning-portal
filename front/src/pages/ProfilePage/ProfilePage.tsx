import { useState } from 'react';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { SalaryCounter } from '../../components/SalaryCounter/SalaryCounter';
import { SalaryProgressBar } from '../../components/SalaryProgressBar/SalaryProgressBar';
import { useUserContext } from '../../store/UserDetails';
import { myRequest } from '../../utils/axios';
import s from './ProfilePage.module.css';

export const ProfilePage = () => {
    const {
        userDetails: { salary, name, _id }
    } = useUserContext();

    const checkTelegramConnection = () => {
        myRequest
            .get('/checkTelegramConnection')
            .then(console.log)
            .catch(console.log);
    };
    return (
        <MainBlockWrapper title="МОЙ ПРОФИЛЬ">
            <div className={s.root}>
                <div className={s.info}>
                    <div className={s.avatarSkeleton}>
                        Profile avatar <br /> in future
                    </div>
                    <div className={s.textInfo}>{name}</div>
                    <div className={s.telegramConnection}>
                        <p>
                            Status of connection to telegram bot:{' '}
                            <i>here will b status</i>
                        </p>
                        <a
                            target="_blank"
                            href="https://web.telegram.org/z/#5965431146"
                        >
                            Link to connect to telegram bot
                        </a>
                        <div
                            className={s.checkTelegramConnection}
                            onClick={checkTelegramConnection}
                        >
                            Check telegram connection
                        </div>
                    </div>
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
