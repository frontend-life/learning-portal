import s from './LoginPage.module.css'

import { Header } from 'src/components_v2/Header/Header';
import { Logo } from 'src/components_v2/Logo/Logo';
import { Button } from 'src/components_v2/Button/Button';
import { getLang } from '@utils/langs';
import { useState, useEffect } from 'react';
import { Backend } from '@shared/Backend';
import { setToken } from '@utils/auth';
import { PATHS } from '@utils/paths';

export const LoginPage = () => {
    const [showLoader, setShowLoader] = useState(false)
    
    const handleSubmit = () => {
        setShowLoader(true);
        (window as any).Telegram.Login.auth(
            { 
                bot_id: '5965431146', 
                request_access: true,
                lang: 'ru'
            },
            (data) => {
              if (!data) {
                console.log('no data') 
              }
              
              Backend.sendTelegramAuthData(data)
              // need to add a proper response status check or fix response (ask Sergey)
                .then((response: any) => { 
                    setShowLoader(false)
                    if(response) {
                      if(response.state === 1) {
                        setToken(response.token)
                        window.location.assign(PATHS.redesignedProfile)
                      } else {
                        setToken(response.token);
                        window.location.assign(PATHS.redesignedProfile)
                      }
                    }
                })
                .catch((error) => {
                  setShowLoader(false);
                  console.log(error);
                  alert('Something went wrong');
                });
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
            <a href={PATHS.logoutInstruction}>{getLang('login_switch_account')}</a>
        </div>
    );
}


