import { TopRightMenu } from '../TopRightMenu/TopRightMenu';
import { Logo } from './logo';
import s from './MainBlockWrapper.module.css';

function MainBlockWrapper({ children, title }) {
    return (
        <div className={s.root}>
            <header className={s.header}>
                <Logo />
                <div className={s.text}>{title}</div>
                <TopRightMenu />
            </header>
            <main className={s.content}>{children}</main>
        </div>
    );
}

export default MainBlockWrapper;
