import s from './Logo.module.css';
import logo from './assets/Logo.svg'

export const Logo = (props: React.HTMLProps<HTMLElement>) => {
    
      
    return (
        //  @ts-ignore
        <img className={s.logo} src={logo} alt="logo" {...props}/>
    );
};