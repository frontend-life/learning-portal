import s from './LogoutInstruction.module.css'

import terminate from 'src/pages/LogoutInstruction/terminate.png'
import telegramChat from 'src/pages/LogoutInstruction/telegram_chat.png'
import { getLang } from '@utils/langs';
import { PATHS } from '@utils/paths';

export const LogoutInstruction = () => {
  return (
    <div className={s.root}>
      <h1>{getLang('logout_instruction_header')}</h1>
      <p>{getLang('logout_instruction_chat_p')}</p>
      <img src={telegramChat}/>
      <p>{getLang('logout_instruction_message_p')}</p>
      <img src={terminate}/>
      <p>{getLang('logout_instruction_back_to_login_p1')}<a href={PATHS.login}>{getLang('logout_instruction_back_to_login_a')}</a>{getLang('logout_instruction_back_to_login_p2')}</p>
    </div>
  );
}

