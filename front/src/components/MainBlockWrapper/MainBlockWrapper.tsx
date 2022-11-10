import './MainBlockWrapper.css';

function Header({ children }) {
    return <div>{children}</div>;
}

function MainBlockWrapper({ children, title }) {
    return (
        <div>
            <Header>{title}</Header>
            {children}
        </div>
    );
}

export default MainBlockWrapper;
