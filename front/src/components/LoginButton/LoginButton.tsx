import s from './LoginButton.module.css';

export const LoginButton = ({text}:{text:string}) => {
    return (
        <button className={s.button}>{text}</button>
    );
};