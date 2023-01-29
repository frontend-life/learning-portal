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
                    <div className={s.textInfo}>
                        <p className={s.name}>{name}</p>
                        <div className={s.telegramConnection}>
                            <p>
                                <i>
                                    {telegramChatId
                                        ? getLang(
                                              'you_are_connected_to_telegram'
                                          )
                                        : getLang(
                                              'no_connection_with_telegram'
                                          )}
                                </i>
                            </p>
                        </div>
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
