import { getLang } from '@utils/langs';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { SalaryCounter } from '../../components/SalaryCounter/SalaryCounter';
import { SalaryProgressBar } from '../../components/SalaryProgressBar/SalaryProgressBar';
import { useUserContext } from '../../store/UserDetails';
import s from './ProfilePage.module.css';

export const ProfilePage = () => {
    const {
        userDetails: { salary, name, telegramChatId, _id }
    } = useUserContext();

    return (
        <MainBlockWrapper title={getLang('my_profile')}>
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
                                    ? getLang('you_are_connected_to_telegram')
                                    : getLang('no_connection_with_telegram')}
                            </i>
                        </p>
                        <a
                            className={s.checkTelegramConnection}
                            target="_blank"
                            rel="noreferrer"
                            href="https://web.telegram.org/z/#5965431146"
                        >
                            {getLang('link_to_telegram_bot')}
                        </a>
                        <span className={s.telegramConnectionId}>
                            Your id is: {_id}
                        </span>
                    </div>
                </div>
                <div className={s.salary}>
                    <div>
                        {getLang('my_salary') + ' '}
                        <SalaryCounter value={salary} />
                        $/m
                    </div>
                    <div className={s.progress}>
                        <SalaryProgressBar value={salary} />
                    </div>
                </div>
            </div>
        </MainBlockWrapper>
    );
};
