import s from './MainBlockWrapper.module.css';

function Header({ children }) {
    return <div>{children}</div>;
}

function MainBlockWrapper({ children, title }) {
    return (
        <div className={s.root}>
            <Header>{title}</Header>
            {children}
        </div>
    );
}

export default MainBlockWrapper;
