import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { SalaryCounter } from '../../components/SalaryCounter/SalaryCounter';
import { SalaryProgressBar } from '../../components/SalaryProgressBar/SalaryProgressBar';
import { useUserContext } from '../../store/UserDetails';
import { myRequest } from '../../utils/axios';
import s from './ProfilePage.module.css';

export const ProfilePage = () => {
    const {
        userDetails: { salary, name, telegramChatId, _id }
    } = useUserContext();

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
                            <i>
                                {telegramChatId
                                    ? 'You are connected to telegram bot'
                                    : 'No connection with telegram'}
                            </i>
                        </p>
                        <a
                            className={s.checkTelegramConnection}
                            target="_blank"
                            rel="noreferrer"
                            href="https://web.telegram.org/z/#5965431146"
                        >
                            Link to telegram bot
                        </a>
                        <span className={s.telegramConnectionId}>
                            Your id is: {_id}
                        </span>
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
