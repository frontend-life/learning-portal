import { Logo } from './logo';
import s from './MainBlockWrapper.module.css';
import { MenuSvg } from './menuSvg';

function MainBlockWrapper({ children, title }) {
    return (
        <div className={s.root}>
            <header className={s.header}>
                <Logo />
                <div className={s.text}>{title}</div>
                <MenuSvg />
            </header>
            {children}
        </div>
    );
}

export default MainBlockWrapper;
