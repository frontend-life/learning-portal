import s from './Logo.module.css';
import logo from './assets/Logo.svg'

export const Logo = () => {
    return (
        <img className={s.logo} src={logo} alt="logo" />
    );
};