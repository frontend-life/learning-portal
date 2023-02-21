import s from './LoginPage.module.css'

import { Header } from '@components/Header/Header';
import { Logo } from '@components/Logo/Logo';
import { LoginButton } from '@components/LoginButton/LoginButton';
import { getLang } from '@utils/langs';

export const LoginPage = () => {
    return (
        <div className={s.root}>
            <Logo/>
            <Header 
                title={getLang('login_greeting_title')} 
                subtitle={getLang('login_greeting_subtitle')}/>
            <LoginButton text={getLang('login_with_telegram')}/>
        </div>
    );
}