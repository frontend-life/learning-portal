import s from './LoginPage.module.css'

import { Header } from 'src/components_v2/Header/Header';
import { Logo } from 'src/components_v2/Logo/Logo';
import { Button } from 'src/components_v2/Button/Button';
import { getLang } from '@utils/langs';
import { useState, useEffect } from 'react';

export const LoginPage = () => {
    const [showLoader, setShowLoader] = useState(false)

    // const onSubmit = () => {
    //     setShowLoader(true)
    //     setTimeout(() => setShowLoader(false), 1000)
    // }

    const handleSubmit = () => {
        (window as any).Telegram.Login.auth(
            { 
                bot_id: '5965431146', 
                request_access: true,
                lang: 'eng',
            },
            (data) => {
              if (!data) {
                // authorization failed
                console.log('no data brev')
              }
          
              // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
              console.log(data);
            }
          );
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?21';
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        }
      }, []);
    

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
                onSubmit={handleSubmit}
            />
        </div>
    );
}


