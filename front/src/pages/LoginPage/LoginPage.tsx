import s from './LoginPage.module.css'

import { Header } from 'src/components_v2/Header/Header';
import { Logo } from 'src/components_v2/Logo/Logo';
import { Button } from 'src/components_v2/Button/Button';
import { getLang } from '@utils/langs';
import { useState } from 'react';

export const LoginPage = () => {
    const [showLoader, setShowLoader] = useState(false)

    const onSubmit = () => {
        setShowLoader(true)
        setTimeout(() => setShowLoader(false), 1000)
    }

    return (
        <div className={s.root}>
            <Logo className={s.logo}/>
            <Header
                title={getLang('login_greeting_title')} 
                subtitle={getLang('login_greeting_subtitle')}/>
            <Button 
                text={getLang('login_with_telegram')}
                disabled={showLoader} 
                loading={showLoader}
                onSubmit={onSubmit}
            />
        </div>
    );
}